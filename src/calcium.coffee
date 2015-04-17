#
# file: calcium.coffee
# author: Kuriyama hibiya
# license: MIT
#

jsdom = require 'jsdom'
request = require 'request'

# pass script and get frames
jsdom.defaultDocumentFeatures =
    FetchExternalResources: false
    ProcessExternalResources: false

zfill = (n) ->
  return ('0' + n).substr -2

getDomain = (s) ->
    switch s
        #     A : ??
        when 'B', 'sen', 'seoul', '서울', '서울특별시'
            'hes.sen.go.kr'
        when 'C', 'pen', 'busan', '부산', '부산광역시'
            'hes.pen.go.kr'
        when 'D', 'dge', 'daegu', '대구', '대구광역시', '머구', '대집트'
            'hes.dge.go.kr'
        when 'E', 'ice', 'incheon', '인천', '인천광역시', '마계'
            'hes.ice.go.kr'
        when 'F', 'gen', 'gwangju', '광주', '광주광역시', '팡주'
            'hes.gen.go.kr'
        when 'G', 'dje', 'daejeon', '대전', '대전광역시', '머전'
            'hes.dje.go.kr'
        when 'H', 'use', 'ulsan', '울산', '울산광역시'
            'hes.use.go.kr'
        when 'I', 'sje', 'sejong', '세종', '세종시', '세종특별자치시'
            'hes.sje.go.kr'
        when 'J', 'goe', 'gyeonggi', '경기', '경기도'
            'hes.goe.go.kr'
        when 'K', 'gwe', 'gangwon', '강원', '강원도'
            'hes.gwe.go.kr'
        #     L : ??
        when 'M', 'cbe', 'chungbuk', '충북', '충청북도'
            'hes.cbe.go.kr'
        when 'N', 'cne', 'chungnam', '충남', '충청남도'
            'hes.cne.go.kr'
        #     O : ??
        when 'P', 'jbe', 'jeonbuk', '전북', '전라북도'
            'hes.jbe.go.kr'
        when 'Q', 'jne', 'jeonnam', '전남', '전라남도'
            'hes.jne.go.kr'
        when 'R', 'gbe', 'gyeongbuk', '경북', '경상북도'
            'hes.gbe.kr'
        when 'S', 'gne', 'gyeongnam', '경남', '경상남도'
            'hes.gne.go.kr'
        when 'T', 'jje', 'jeju', '제주', '제주도', '탐라', '탐라국'
            'hes.jje.go.kr' # is 203.230.177.150
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

    jsdom.env
        url: "http://#{domain}/sts_sci_md00_001.do?schulCode=#{school}&schulCrseScCode=4&schYm=#{year}.#{zfill(month)}"
        QuerySelector: true
        done: (e, window) ->
            if e
                callback "Request failed: #{e.toString()}", null

            else
                r = {}
                q = window.document.querySelectorAll '.tbl_type3 td div'

                for day in q

                    if not day? or not day.innerHTML.indexOf '<br>'
                        continue

                    day = day.innerHTML.replace /[①-⑬]/g, ''
                    date = day.substr 0, day.indexOf '<br>'
                    item = day.split /(\[.+?\])/

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
        uri: "http://#{domain}/spr_ccm_cm01_100.do?kraOrgNm=#{query}"
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
#exports.find '서울', '린인', (e, d) ->
#    console.dir d
