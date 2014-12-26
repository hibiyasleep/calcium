Calcium
=======

Korea School Meal Information API

*NOTE: Some school include Korea Digital Media Highschool doesn't supported*

Usage
-----

* `callback` will get 2 arguments: `(error, data)`
  * `error` is String that presents error
  * `data` is Object or Array, that contains data
* `calcium.find gov, query, callback`
  * `gov` is domain prefix, or city name in english, korean, or Yamin
* `calcium.get code[, year, month], callback`

Example
-------

```js
> calcium = require('calcium')
> calcium.find('gyeonggi', '디지털', function(e, d){
... if(e) console.error(e)
... else  console.dir(d)
... })
>
[ { name: '한국디지털미디어고등학교',
    code: 'J100000855',
    type: '고등학교',
    address: '경기도 안산시 단원구 와동' },
  { name: '양영디지털고등학교',
    code: 'J100000708',
    type: '고등학교',
    address: '경기도 성남시 분당구 서현동' } ]
> calcium.get('J100000855', 2014, 12, function(e, d){
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