#!/usr/bin/env node
//
// kuriyama hibiya <kuriyama@hibiya.moe>
// calcium.js
//

'use strict'

const jsdom = require('jsdom')
const request = require('request')

const zfill = function zfill(n) {
  return ('0' + n).substr(-2)
}

const getDomain = function _getDomain(s) {
  // This looks sucks; I know it
  switch(s) {
    //    A : ??
    case 'B': case 'sen': case 'seoul':
    case '서울': case '서울특별시':
      return 'stu.sen.go.kr'
    case 'C': case 'pen': case 'busan':
    case '부산': case '부산광역시':
      return 'stu.pen.go.kr'
    case 'D': case 'dge': case 'daegu':
    case '대구': case '대구광역시':
      return 'stu.dge.go.kr'
    case 'E': case 'ice': case 'incheon':
    case '인천': case '인천광역시':
      return 'stu.ice.go.kr'
    case 'F': case 'gen': case 'gwangju':
    case '광주': case '광주광역시':
      return 'stu.gen.go.kr'
    case 'G': case 'dje': case 'daejeon':
    case '대전': case '대전광역시':
      return 'stu.dje.go.kr'
    case 'H': case 'use': case 'ulsan':
    case '울산': case '울산광역시':
      return 'stu.use.go.kr'
    case 'I': case 'sje': case 'sejong':
    case '세종': case '세종시': case '세종특별자치시':
      return 'stu.sje.go.kr'
    case 'J': case 'goe': case 'gyeonggi':
    case '경기': case '경기도':
      return 'stu.goe.go.kr'
    case 'K': case 'gwe': case 'gangwon':
    case '강원': case '강원도':
      return 'stu.gwe.go.kr'
    //    L : ??
    case 'M': case 'cbe': case 'chungbuk':
    case '충북': case '충청북도':
      return 'stu.cbe.go.kr'
    case 'N': case 'cne': case 'chungnam':
    case '충남': case '충청남도':
      return 'stu.cne.go.kr'
    //    O : ??
    case 'P': case 'jbe': case 'jeonbuk':
    case '전북': case '전라북도':
      return 'stu.jbe.go.kr'
    case 'Q': case 'jne': case 'jeonnam':
    case '전남': case '전라남도':
      return 'stu.jne.go.kr'
    case 'R': case 'gbe': case 'gyeongbuk':
    case '경북': case '경상북도':
      return 'stu.gbe.kr'
    case 'S': case 'gne': case 'gyeongnam':
    case '경남': case '경상남도':
      return 'stu.gne.go.kr'
    case 'T': case 'jje': case 'jeju':
    case '제주': case '제주도':
      return 'stu.jje.go.kr'
    default:
      return false
  }
}

exports.get = function get(school, year, month, callback) {
  let d = new Date()

  if(arguments.length === 2) {        // school, callback: get current meal
    callback = year
    year = d.getFullYear()
    month = d.getMonth() + 1
  } else if(arguments.length === 4) { // school, year, month, callback
    if(!(0 < month <= 12)) {
      callback('Invalid month (should: 1-12)', null)
      return
    }
  } else if(arguments.length === 1) { // school only
    callback = function(e, d) {
      if(e) {
        console.error(e)
      } else {
        console.log(
          d.map( (o, i) =>
            o && `${i}:\n` + Object.keys(o)
                              .map( i => `  ${i}: ${o[i].join(', ')}` )
                              .join('\n')
          ).filter(Boolean).join('\n')
        )
      }
    }
    year = d.getFullYear()
    month = d.getMonth() + 1
  } else {
    throw TypeError('Invalid argument count (should: 2 or 4)')
  }

  if(!/^[B-KMNP-T][0-9]{9}$/.test(school)) {
    throw TypeError(`Invalid or unknown code (${school})`)
  }

  let domain = getDomain(school[0])

  request.post({
    url: `http://${domain}/sts_sci_md00_001.do`,
    form: `schulCode=${school}&schulCrseScCode=4&ay=${year}&mm=${zfill(month)}`,
  }, function(e, res, d) {
    if(e) {
      callback(`Request failed: ${e.toString()}`, null)
      return
    }
    let doc = jsdom.jsdom(d, {
      querySelector: true
    })

    let window = doc.defaultView
    let r = []
    let q = window.document.querySelectorAll('.tbl_type3 td div')

    Array.prototype.forEach.call(q, function(day) {  // nodelist sucks

      if(typeof day === 'undefined' || !day.innerHTML.indexOf('<br>'))
        return

      day = day.innerHTML
      let date = day.substr(0, day.indexOf('<br>'))
      let item = day.split(/(\[.+?\])/)

      if(date == '')
        return

      r[date] = {}

      for(let i = 1; i < item.length; i += 2) {

        let name = item[i].replace(/(\[|\])/g, '')
        let value = item[i+1].split('<br>')
                             .filter(Boolean)
                             .map( l => l.replace(/(\(1?[0-9]\))+$/g, '') )

        if(name == '조식')
          r[date].breakfast = value
        if(name == '중식')
          r[date].lunch = value
        if(name == '석식')
          r[date].dinner = value

      }

    })

    callback(null, r)

  })
}

exports.find = function(doe, query, callback) {

  if(!callback) {
    callback = function(e, d) {
      if(e)
        console.error(e)
      else
        console.log(
          d.map( o => [
            'name: ' + o.name,
            'code: ' + o.code,
            'type: ' + o.type,
            'address: ' + o.address
          ].join('\n') ).join('\n')
        )
    }
  }

  let domain = getDomain(doe)

  if(!domain) {
    callback(`No such dep: ${doe}`, null)
    return
  }

  query = encodeURIComponent(query)

  request({
    uri: `http://${domain}/spr_ccm_cm01_100.do?kraOrgNm=${query}`,
    json: true
  }, function(e, res, j) {

    if(e) {
      callback(`Request failed: ${e}`, null)
      return
    }

    let l = j.resultSVO.orgDVOList

    callback(null, l.map( o => {
      return {
        name: o.kraOrgNm,
        code: o.orgCode,
        type: o.schulCrseScCodeNm,
        address: o.zipAdres
      }
    } ))

  }).on('error', function(e) {
    callback(`Request failed: ${e}`, null)
  })

}
