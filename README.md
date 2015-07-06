Calcium
=======

Korea School Meal Information API

*NOTE: Digital Media Highschool is NOT supported. See the [Dimigo](#dimigo) section for more info.*

Usage
-----

* `callback` gets 2 arguments: `(error, data)`
  * `error`: String, presents error.
  * `data`: Array of Object, contains data.
* `calcium.find(gov, query, callback)`
  * `gov` is domain prefix or city name in English, Korean, or Yamin.
* `calcium.get(code[, year, month], callback)`
  * `code` is a school code.

Example
-------

```coffee
coffee> calcium = require 'calcium'
coffee> calcium.find 'seoul', '린인', (e, d) -> console.log e or d
coffee>
[ { name: '선린인터넷고등학교',
    code: 'B100000658',
    type: '고등학교',
    address: '서울특별시 용산구 청파동3가' } ]
coffee> calcium.get 'B100000658', 2014, 12, (e, d) -> console.log e or d
coffee>
[
  ...
  { lunch: [ '칼슘쌀밥', '소고기무국', '꽁치김치조림', '잡채', '포기김치', '딸기쨈설기' ],
    dinner: [ '옛날도시락', '홍합탕', '깍두기', '모듬장아찌', '치킨샐러드' ] },
  { lunch: [ '율무밥', '짬뽕국', '고춧잎무말랭이무침', '함박스테이크', '포기김치', '브라운소스', '고구마샐러드' ],
    dinner: [ '칼슘쌀밥', '닭다리백숙', '무생채', '가마보꼬볶음', '포기김치' ] },
  { lunch: [ '칼슘쌀밥', '육개장', '양념깻잎', '미트볼케찹볶음', '포기김치', '키위' ],
    dinner: [ '메조밥', '꽃게탕', '꽈리고추찜', '찜닭', '야채전', '포기김치' ] },
  { lunch: [ '흑미밥', '쑥국', '바베큐폭찹', '두부양념구이', '포기김치', '구이김' ],
    dinner: [ '칼슘쌀밥', '콩비지찌개', '시금치무침', '낙지볶음', '회오리감자', '포기김치' ] },
  { lunch: [ '콩나물밥', '미역된장국', '간장파닭', '도라지무침', '포기김치', '양념장(간장)', '요구르트' ],
    dinner: [ '김밥', '모밀국수', '맛살깨즙냉채', '깐쇼새우', '포기김치' ] },
  ...
]
>
```

Dimigo
------

```
> GET https://dimigo.in/pages/dimibob_getdata.php?d=20150319 HTTP/1.1
< HTTP/1.1 200 OK
{"no":"127","date":"2015-03-19","breakfast":"치즈빵/볶음밥/춘권튀김/포기김치/웰빙샐러드/씨리얼/우유","lunch":"참치비빔밥(마요or고추장)/콩나물국/계란야채찜/도토리묵무침/명엽채볶음/포기김치/방울토마토","dinner":"순대야채볶음/잡곡밥/근대국/어묵양파볶음/멸치볶음/부추겉절이/포기김치/포도맛푸딩","snack":"페퍼로니피자/파인애플/오이피클/피크닉","added":"2015-03-19 22:37:29"}
```

Have fun!

<!-- 뤼대한 김정일 교장 동지 만세! -->
