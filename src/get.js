const request = require('request')
const jsdom = require('jsdom')

const getDomain = require('./getDomain')

const zerolFill = month => ('0' + month).substr(-2)
const initCallback = (e, d) => {
  return e? console.error(e) : console.log(d)
}

module.exports = function fetchSchoolMeal(school, year, month, callback = initCallback) {
  if(!school || !/^[B-KMNP-T][0-9]{9}$/.test(school)) {
    throw new TypeError('Invalid or unknown code: '+ school)
  }

  const now = new Date()

  if(typeof year === 'function') {
    callback = year
    year = now.getFullYear()
  } else if(!year) {
    year = now.getFullYear()
  }
  if(!month) {
    month = now.getMonth() + 1
  }

  const domain = getDomain(school[0])
  if(!domain) {
    return callback(new Error('No such department: ' + doe), null)
  }

  request.post({
    url: `https://${ domain }/sts_sci_md00_001.do`,
    form: `schulCode=${ school }&schulCrseScCode=4&ay=${ year }&mm=${ zerolFill(month) }`
  }, (e, r, body) => {
    if(e) return callback(e, null)

    const window = jsdom.jsdom(body, { querySelector: true }).defaultView
    const menuTable = window.document.querySelectorAll('.tbl_type3 td div')

    let result = {}

    for(let dayMenu of menuTable) {
      if(!dayMenu || !dayMenu.innerHTML.indexOf('<br>')) continue

      const day = dayMenu.innerHTML
      const date = day.substr(0, day.indexOf('<br>'))
      const item = day.split(/(\[.+?\])/)

      if(!date) continue

      result[date] = {}

      for(let index = 1; index < item.length; index += 2) {
        const name = item[index].replace(/(\[|\])/g, '')
        const value = item[index + 1]
          .split('<br>')
          .filter(Boolean)
          .map(food => food.replace(/(1?[0-9].)+$/g, ''))

        switch(name) {
          case '조식': result[date].breakfast = value; break
          case '중식': result[date].lunch = value; break
          case '석식': result[date].dinner = value; break
        }
      }
    }

    return callback(null, result)
  })
}
