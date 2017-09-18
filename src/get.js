const request = require('request')
const jsdom = require('jsdom')

const getDomain = require('./getDomain')

const zerolFill = (month) => ('0' + month).substr(-2)
const initCallback = (err, result) => {
  return (err)
    ? console.error(err)
    : console.log(result)
}

module.exports = (school, year, month, callback = initCallback) => {
  if (!school) return
  if (!/^[B-KMNP-T][0-9]{9}$/.test(school)) {
    throw TypeError(`Invalid or unknown code (${ school })`)
  }

  const now = new Date()
  if (!year) year = now.getFullYear()
  if (!month) month = now.getMonth() + 1

  const domain = getDomain(school[0])
  if (!domain) {
    const err = `No such department: ${doe}`

    return callback(err, null)
  }

  const payload = {
    url: `http://${ domain }/sts_sci_md00_001.do`,
    form: `schulCode=${ school }&schulCrseScCode=4&ay=${ year }&mm=${ zerolFill(month) }`
  }

  request.post(payload, (err, res, body) => {
    if (err) return callback(err, null)

    const window = jsdom.jsdom(body, { querySelector: true }).defaultView
    const tableMenu = window.document.querySelectorAll('.tbl_type3 td div')

    const result = {}

    Array.prototype.forEach.call(tableMenu, (dayMenu) => {
      const isDayMenuExists = !dayMenu || !dayMenu.innerHTML.indexOf('<br>')
      if (isDayMenuExists) return

      const day = dayMenu.innerHTML
      const date = day.substr(0, day.indexOf('<br>'))
      const item = day.split(/(\[.+?\])/)

      if (date == '') return

      result[date] = {}

      for (let index = 1; index < item.length; index += 2) {
        const name = item[index].replace(/(\[|\])/g, '')
        const value = item[index + 1]
          .split('<br>')
          .filter(Boolean)
          .map(food => food.replace(/(1?[0-9].)+$/g, ''))

        switch (name) {
          case '조식': result[date].breakfast = value; break
          case '중식': result[date].lunch = value; break
          case '석식': result[date].dinner = value; break
        }
      }
    })

    return callback(null, result)
  })
}
