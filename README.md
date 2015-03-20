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
{ '1': { lunch: [ '칼슘쌀밥', '와플②⑪', '닭다리백숙', '땅콩콩자반', '햄구이', '포기김치' ] },
  '2': { lunch: [ '수수밥', '감자탕⑤', '도토리묵야채무침', '임연수구이⑥', '포기김치', '구이김' ] },
  '3': { lunch: [ '칼슘쌀밥', '설렁탕⑥', '콩나물무침(붉)', '미트볼케찹볶음①', '포기김치', '귤' ] },
  '4': { lunch: [ '현미밥', '아욱된장국', '등갈비김치찜⑩', '잔멸치볶음', '야채전', '깍두기' ] },
  '5': { lunch: [ '토마토소스스파게티⑩', '허니브레드①②⑤⑥⑬', '모듬감자튀김⑤', '오이피클⑬', '과일주스', '야채샐러드' ] },
  '8': { lunch: [ '칼슘쌀밥', '동태찌개', '떡갈비', '쫄면야채무침', '포기김치', '머스터드소스', '모듬견과류④' ] },
  '9': { lunch: [ '기장밥', '북어채무국⑤', '숙주미나리무침', '소고기당면볶음', '두부양념구이', '포기김치' ] },
  '10': { lunch: [ '칼슘쌀밥', '수제비국', '찜닭', '호박볶음⑨', '포기김치', '파인애플꼬치' ] },
  '12': { lunch: [ '김밥', '잔치국수⑥', '오징어초무침', '고구마튀김⑤⑥', '포기김치', '오렌지' ] },
  '17': { lunch: [ '칼슘쌀밥', '우동', '오징어떡볶음', '스크램블에그', '포기김치', '사과(부사)' ] },
  '18': { lunch: [ '보리밥', '참치김치찌개⑨', '돈육야채볶음', '감자채볶음', '포기김치', '쌈장', '상추쌈' ] },
  '19': { lunch: [ '김치볶음밥⑩', '콩나물국(흰)', '오이무침', '등심돈까스', '포기김치', '브라운소스', '바나나우유②' ] },
  '22': { lunch: [ '칼슘쌀밥', '육개장', '잡채⑧⑩', '가자미구이', '포기김치', '인절미⑤⑬' ] },
  '23': { lunch: [ '흑미밥', '근대된장국', '연두부', '명엽채볶음', '오리김치볶음⑨', '깍두기', '양념장(간장)' ] },
  '24': { lunch: [ '칼슘쌀밥', '케이크①②⑥', '무생채', '돈육땅콩강정', '포기김치', '카레소스⑩' ] },
  '26': { lunch: [ '나물비빔밥', '유부된장국⑤', '계란후라이', '새우튀김', '포기김치', '양념장(고추장)', '요구르트(사과맛)' ] },
  '29': { lunch: [ '칼슘쌀밥', '찐빵', '쑥갓어묵국', '시금치무침', '닭야채볶음', '포기김치' ] } }
>
```

Dimigo
------

```
> GET /pages/dimibob_getdata.php?d=20150319 HTTP/1.1
< HTTP/1.1 200 OK
{"no":"127","date":"2015-03-19","breakfast":"\uce58\uc988\ube75\/\ubcf6\uc74c\ubc25\/\ucd98\uad8c\ud280\uae40\/\ud3ec\uae30\uae40\uce58\/\uc6f0\ube59\uc0d0\ub7ec\ub4dc\/\uc528\ub9ac\uc5bc\/\uc6b0\uc720","lunch":"\ucc38\uce58\ube44\ube54\ubc25(\ub9c8\uc694or\uace0\ucd94\uc7a5)\/\ucf69\ub098\ubb3c\uad6d\/\uacc4\ub780\uc57c\ucc44\ucc1c\/\ub3c4\ud1a0\ub9ac\ubb35\ubb34\uce68\/\uba85\uc5fd\ucc44\ubcf6\uc74c\/\ud3ec\uae30\uae40\uce58\/\ubc29\uc6b8\ud1a0\ub9c8\ud1a0","dinner":"\uc21c\ub300\uc57c\ucc44\ubcf6\uc74c\/\uc7a1\uace1\ubc25\/\uadfc\ub300\uad6d\/\uc5b4\ubb35\uc591\ud30c\ubcf6\uc74c\/\uba78\uce58\ubcf6\uc74c\/\ubd80\ucd94\uac89\uc808\uc774\/\ud3ec\uae30\uae40\uce58\/\ud3ec\ub3c4\ub9db\ud478\ub529","snack":"\ud398\ud37c\ub85c\ub2c8\ud53c\uc790\/\ud30c\uc778\uc560\ud50c\/\uc624\uc774\ud53c\ud074\/\ud53c\ud06c\ub2c9","added":"2015-03-19 22:37:29"}
```

Have fun!

<!-- 뤼대한 김정일 교장 동지 만세! -->