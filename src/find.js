const request = require('request')
const jsdom = require('jsdom')

const getDomain = require('./getDomain')

const initCallback = (e, d) => {
  return e? console.error(e) : console.log(d)
}

module.exports = function findSchool(dep, query, callback = initCallback) {
  const domain = getDomain(dep)
  if(!domain) {
    return callback(new Error('No such department: ' + dep), null)
  }

  request({
    uri: `http://${ domain }/spr_ccm_cm01_100.do?kraOrgNm=${ encodeURIComponent(query) }`,
    json: true
  }, (e, res, body) => {
    if(e) return callback(e, null)

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
