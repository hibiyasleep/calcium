const request = require('request')
const jsdom = require('jsdom')

const getDomain = require('./getDomain')

const initCallback = (err, result) => {
  return (err)
    ? console.error(err)
    : console.log(result)
}

module.exports = (__domain, query, callback = initCallback) => {
  const domain = getDomain(__domain)
  if (!domain) {
    const err = `No such department: ${ __domain }`

    return callback(err, null)
  }

  const schoolName = encodeURIComponent(query)
  const payload = {
    uri: `http://${ domain }/spr_ccm_cm01_100.do?kraOrgNm=${ schoolName }`,
    json: true
  }

  request(payload, (err, res, body) => {
    if (err) return callback(err, null)

    const foundData = body.resultSVO.orgDVOList
    const result = foundData.map(({ kraOrgNm, orgCode, schulCrseScCodeNm, zipAdres }) => ({
      name: kraOrgNm,
      code: orgCode,
      type: schulCrseScCodeNm,
      address: zipAdres
    }))

    return callback(null, result)
  })
}
