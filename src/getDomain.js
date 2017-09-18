const domains = {
  // A: ???
  'sen.go': ['b', 'sen', 'seoul', '서울', '서울특별시'],
  'pen.go': ['c', 'pen', 'busan', '부산', '부산광역시'],
  'dge.go': ['d', 'dge', 'daegu', '대구', '대구광역시'],
  'ice.go': ['e', 'ice', 'incheon', '인천', '인천광역시'],
  'gen.go': ['f', 'gen', 'gwangju', '광주', '광주광역시'],
  'dje.go': ['g', 'dje', 'daejeon', '대전', '대전광역시'],
  'use.go': ['h', 'use', 'ulsan', '울산', '울산광역시'],
  'sje.go': ['i', 'sje', 'sejong', '세종', '세종시', '세종특별자치시'],
  'goe.go': ['j', 'goe', 'gyeonggi', '경기', '경기도'],
  'gwe.go': ['k', 'gwe', 'gangwon', '강원', '강원도'],
  // L : ???
  'cbe.go': ['m', 'cbe', 'chungbuk', '충북', '충청북도'],
  'cne.go': ['n', 'cne', 'chungnam', '충남', '충청남도'],
  // O : ???
  'jbe.go': ['p', 'jbe', 'jeonbuk', '전북', '전라북도'],
  'jne.go': ['q', 'jne', 'jeonnam', '전남', '전라남도'],
  'gbe':    ['r', 'gbe', 'gyeongbuk', '경북', '경상북도'],
  'gne.go': ['s', 'gne', 'gyeongnam', '경남', '경상남도'],
  'jje.go': ['t', 'jje', 'jeju', '제주', '제주도']
}

const prefix = 'stu'

module.exports = (keyword) => {
  if (!keyword) return

  const lowerKeyword = keyword.toLowerCase()

  const code = Object.keys(domains)
  const select = code
    .filter((domain) => domains[domain].includes(lowerKeyword))[0]

  if (select) {
    return `${ prefix }.${ select }.kr`
  }
}
