Calcium
=======

Korea School Meal Information API

Usage
-----

* *callback* will get 2 arguments: `(error, data)`
  * `error` is String that presents error
  * `data` is Object or Array
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



```