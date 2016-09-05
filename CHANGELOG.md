# CHANGELOG

## 0.4.2

* typo: default callback printed wrong date

## 0.4.1

* If no callback present, Default callback will be provided.
  default callback `log`s any output with minimum formatting.
* Invalid arguments will `throw TypeError`.
* MoE changed ingridents marker from circle character (like `①`) to
  parenthesised number (like `(13)`), so fixed this.
* Minor code improvements, and hardcodes.

## 0.4.0

* Switched to ES6/2015, from CoffeeScript. Coffee now s*cks than plain.
* Yamin entry for region selection was removed. since Yamin has endless
  possibilities, we couldn't keep our entry up-to-date.

## 0.3.1

* Built file was wrong.

## 0.3.0

* *Ministry of Education has changed domain hes.~ to stu.~*. 0.2.x and below will
  NOT work.

## 0.2.1

* Fixed: `calcium.find` didn't encode URI's hangul characters, which is caused
  using of `encodeURI` instead of `encodeURIComponent`.

## Older

Since I doesn't remember this period, please refer commit logs instead.
