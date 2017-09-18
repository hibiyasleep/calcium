const domains = {
  // A: ???
  'sen.go':['B', 'SEN', 'SEOUL', '서울', '서울특별시'],
  'pen.go': ['C', 'PEN', 'BUSAN', '부산', '부산광역시'],
  'dge.go': ['D', 'DGE', 'DAEGU', '대구', '대구광역시'],
  'ice.go': ['E', 'ICE', 'INCHEON', '인천', '인천광역시'],
  'gen.go': ['F', 'GEN', 'GWANGJU', '광주', '광주광역시'],
  'dje.go': ['G', 'DJE', 'DAEJEON', '대전', '대전광역시'],
  'use.go': ['H', 'USE', 'ULSAN', '울산', '울산광역시'],
  'sje.go': ['I', 'SJE', 'SEJONG', '세종', '세종시', '세종특별자치시'],
  'goe.go': ['J', 'GOE', 'GYEONGGI', '경기', '경기도'],
  'gwe.go': ['K', 'GWE', 'GANGWON', '강원', '강원도'],
  // L : ???
  'cbe.go': ['M', 'CBE', 'CHUNGBUK', '충북', '충청북도'],
  'cne.go': ['N', 'CNE', 'CHUNGNAM', '충남', '충청남도'],
  // O : ???
  'jbe.go': ['P', 'JBE', 'JEONBUK', '전북', '전라북도'],
  'jne.go': ['Q', 'JNE', 'JEONNAM', '전남', '전라남도'],
  'gbe': ['R', 'GBE', 'GYEONGBUK', '경북', '경상북도'],
  'gne.go': ['S', 'GNE', 'GYEONGNAM', '경남', '경상남도'],
  'jje.go': ['T', 'JJE', 'JEUJU', '제주', '제주도']
}

const prefix = 'stu'

module.exports = (keyword) => {
  if (!keyword) return

  const keywordUppered = keyword.toUpperCase()

  const code = Object.keys(domains)
  const select = code
    .filter((domain) => domains[domain].includes(keywordUppered))[0]

  if (select) {
    return `${ prefix }.${ select }.kr`
  }
}
