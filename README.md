Calcium
=======

Korea School Meal Information API

*NOTE: 디미고 안 됨 (Does not work with Digital Media Highschool)*

*See the [Dimigo](#dimigo) section for more info.*

Usage
-----

* `callback` will get 2 arguments: `(error, data)`
  * `error` is String that presents error
  * `data` is Object or Array, that contains data
* `calcium.find(gov, query, callback)`
  * `gov` is domain prefix, or city name in english, korean, or Yamin
* `calcium.get(code[, year, month], callback)`

Example
-------

```js
> calcium = require('calcium')
> calcium.find('seoul', '린인', function(e, d){
... if(e) console.error(e)
... else  console.dir(d)
... })
>
[ { name: '선린인터넷고등학교',
    code: 'B100000658',
    type: '고등학교',
    address: '서울특별시 용산구 청파동3가' } ]
> calcium.get('B100000658', 2014, 12, function(e, d){
... if(e) console.error(e)
... else  console.dir(d)
... })
>
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
{"no":"127","date":"2015-03-19","breakfast":"\uce58\uc988\ube75\/\ubcf6\uc74c\ubc25\/\ucd98\uad8c\ud280\uae40\/\ud3ec\uae30\uae40\uce58\/\uc6f0\ube59\uc0d0\ub7ec\ub4dc\/\uc528\ub9ac\uc5bc\/\uc6b0\uc720","lunch":"\ucc38\uce58\ube44\ube54\ubc25(\ub9c8\uc694or\uace0\ucd94\uc7a5)\/\ucf69\ub098\ubb3c\uad6d\/\uacc4\ub780\uc57c\ucc44\ucc1c\/\ub3c4\ud1a0\ub9ac\ubb35\ubb34\uce68\/\uba85\uc5fd\ucc44\ubcf6\uc74c\/\ud3ec\uae30\uae40\uce58\/\ubc29\uc6b8\ud1a0\ub9c8\ud1a0","dinner":"\uc21c\ub300\uc57c\ucc44\ubcf6\uc74c\/\uc7a1\uace1\ubc25\/\uadfc\ub300\uad6d\/\uc5b4\ubb35\uc591\ud30c\ubcf6\uc74c\/\uba78\uce58\ubcf6\uc74c\/\ubd80\ucd94\uac89\uc808\uc774\/\ud3ec\uae30\uae40\uce58\/\ud3ec\ub3c4\ub9db\ud478\ub529","snack":"\ud398\ud37c\ub85c\ub2c8\ud53c\uc790\/\ud30c\uc778\uc560\ud50c\/\uc624\uc774\ud53c\ud074\/\ud53c\ud06c\ub2c9","added":"2015-03-19 22:37:29"}
```

Have fun!

<!-- 뤼대한 김정일 교장 동지 만세! -->