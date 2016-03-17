#
# file: calcium.coffee
# author: Kuriyama hibiya
# license: MIT
#

VERSION = '0.2.0'

jsdom = require 'jsdom'
request = require 'request'

zfill = (n) ->
  return ('0' + n).substr -2

getDomain = (s) ->
    switch s
        #     A : ??
        when 'B', 'sen', 'seoul', '서울', '서울특별시'
            'stu.sen.go.kr'
        when 'C', 'pen', 'busan', '부산', '부산광역시'
            'stu.pen.go.kr'
        when 'D', 'dge', 'daegu', '대구', '대구광역시', '머구', '대집트'
            'stu.dge.go.kr'
        when 'E', 'ice', 'incheon', '인천', '인천광역시', '마계'
            'stu.ice.go.kr'
        when 'F', 'gen', 'gwangju', '광주', '광주광역시', '팡주'
            'stu.gen.go.kr'
        when 'G', 'dje', 'daejeon', '대전', '대전광역시', '머전'
            'stu.dje.go.kr'
        when 'H', 'use', 'ulsan', '울산', '울산광역시'
            'stu.use.go.kr'
        when 'I', 'sje', 'sejong', '세종', '세종시', '세종특별자치시'
            'stu.sje.go.kr'
        when 'J', 'goe', 'gyeonggi', '경기', '경기도'
            'stu.goe.go.kr'
        when 'K', 'gwe', 'gangwon', '강원', '강원도'
            'stu.gwe.go.kr'
        #     L : ??
        when 'M', 'cbe', 'chungbuk', '충북', '충청북도'
            'stu.cbe.go.kr'
        when 'N', 'cne', 'chungnam', '충남', '충청남도'
            'stu.cne.go.kr'
        #     O : ??
        when 'P', 'jbe', 'jeonbuk', '전북', '전라북도'
            'stu.jbe.go.kr'
        when 'Q', 'jne', 'jeonnam', '전남', '전라남도'
            'stu.jne.go.kr'
        when 'R', 'gbe', 'gyeongbuk', '경북', '경상북도'
            'stu.gbe.kr'
        when 'S', 'gne', 'gyeongnam', '경남', '경상남도'
            'stu.gne.go.kr'
        when 'T', 'jje', 'jeju', '제주', '제주도', '탐라', '탐라국'
            'stu.jje.go.kr'
        else false

exports.get = (school, year, month, callback) ->
    d = new Date

    unless /^[B-KMNP-T][0-9]{9}$/.test school
        callback "Invalid or unknown code (#{school})", null
        return

    switch arguments.length
        when 2  # school, callback: get current meal
            callback = year
            year = d.getFullYear()
            month = d.getMonth() + 1
        when 4  # school, year, month, callback
            unless 0 < month <= 12
                callback 'Invalid month (1-12)', null
                return
        else
            callback 'Invalid argument count', null
            return

    domain = getDomain school[0]

    request.post
        url: "http://#{domain}/sts_sci_md00_001.do",
        form: "schulCode=#{school}&schulCrseScCode=4&ay=#{year}&mm=#{zfill(month)}",
    , (e, r, d) ->
        if e
            callback "Request failed: #{e.toString()}", null
        else
            doc = jsdom.jsdom d, querySelector: true
            window = doc.defaultView
            r = []
            q = window.document.querySelectorAll '.tbl_type3 td div'

            for day in q

                if not day? or not day.innerHTML.indexOf '<br>'
                    continue

                day = day.innerHTML.replace /[①-⑬]/g, ''
                date = day.substr 0, day.indexOf '<br>'
                item = day.split /(\[.+?\])/

                if date is ''
                    continue

                r[date] = {}

                for i in [1 .. item.length - 1] by 2

                    name = item[i].replace /(\[|\])/g, ''
                    value = item[i+1].split '<br>'
                                         .filter Boolean

                    switch name
                        when '조식'
                            r[date].breakfast = value
                        when '중식'
                            r[date].lunch = value
                        when '석식'
                            r[date].dinner = value

            callback null, r

    undefined

exports.find = (doe, query, callback) ->

    domain = getDomain doe

    unless domain
        callback "No such dep: #{doe}", null

    request
        uri: "http://#{domain}/spr_ccm_cm01_100.do?kraOrgNm=#{encodeURIComponent query}"
        json: true
      , (e, res, j) ->
            if e
                callback "Request failed: #{e}", null
                return

            l = j.resultSVO.orgDVOList

            callback null, l.map (o) ->
                name: o.kraOrgNm
                code: o.orgCode
                type: o.schulCrseScCodeNm
                address: o.zipAdres

        .on 'error', (e) ->
            callback "Request failed: #{e}", null

    undefined

# test

#exports.get 'B100000658', 2015, 3, (e, d) ->
#    console.dir d
#exports.find '서울', '선린', (e, d) ->
#    console.dir d
