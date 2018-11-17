Calcium
=======

Korea School Meal Information API

Usage
-----

* `callback` gets 2 arguments: `(error, data)`
  * `error`: String, presents error.
  * `data`: Array of Object, contains data.
* `calcium.find(gov, query, callback)`
  * `gov` is domain prefix or city name in English (`seoul`) or Korean (`서울`).
* `calcium.get(code[, year, month], callback)`
  * `code` is a school code.

Example
-------

```js
> calcium = require('calcium')
>
> calcium.find('서울', '린인', (e, d) => console.log(d) )
>
[ { name: '선린인터넷고등학교',
    code: 'B100000658',
    type: '고등학교',
    address: '서울특별시 용산구 청파동3가' } ]
>
> calcium.get('B100000658', 2016, 8, (e, d) => console.log(d) )
>
[
  ...
  { lunch: [ '흑미밥', '참치김치찌개', '양념깻잎', '소고기버섯볶음', '부들어묵볶음', '포기김치' ],
    dinner: [ '렌틸콩밥', '동태찌개', '순대야채볶음', '계란말이', '포기김치', '(음료) 과일맛음료 2' ] },
  { lunch: [ '수수밥', '콩비지찌개', '탕평채', '참나물무침', '오리야채볶음', '포기김치' ],
    dinner: [ '소고기야채볶음밥', '함박스테이크', '포기김치', '크림스프', '(음료) 과일맛음료 1', '마카로니샐러드' ] },
  { lunch: [ '칼슘쌀밥', '갈비탕', '계란찜', '만두강정', '깍두기', '자두' ],
    dinner: [ '클로렐라쌀밥', '닭곰탕', '알감자조림', '양념떡꼬치', '임연수구이', '포기김치' ] },
  { lunch: [ '칼슘쌀밥', '감자탕', '청경채무침', '언양식파채불고기', '포기김치', '찐옥수수' ],
    dinner: [ '고추장불고기주먹밥', '잔치국수', '다시마튀각', '포기김치', '햄또띠아' ] },
  ...
]
>
```
