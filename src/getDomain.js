const code = {
  // A: ???
  B: 'sen.go',
  C: 'pen.go',
  D: 'dge.go',
  E: 'ice.go',
  F: 'gen.go',
  G: 'dje.go',
  H: 'use.go',
  I: 'sje.go',
  J: 'goe.go',
  K: 'gwe.go',
  // L : ???
  M: 'cbe.go',
  N: 'cne.go',
  // O : ???
  P: 'jbe.go',
  Q: 'jne.go',
  R: 'gbe',
  S: 'gne.go',
  T: 'jje.go',
}

const domains = [
  // A: ???
  ['B', 'sen', 'seoul', '서울', '서울특별시'],
  ['C', 'pen', 'busan', '부산', '부산광역시'],
  ['D', 'dge', 'daegu', '대구', '대구광역시'],
  ['E', 'ice', 'incheon', '인천', '인천광역시'],
  ['F', 'gen', 'gwangju', '광주', '광주광역시'],
  ['G', 'dje', 'daejeon', '대전', '대전광역시'],
  ['H', 'use', 'ulsan', '울산', '울산광역시'],
  ['I', 'sje', 'sejong', '세종', '세종시', '세종특별자치시'],
  ['J', 'goe', 'gyeonggi', '경기', '경기도'],
  ['K', 'gwe', 'gangwon', '강원', '강원도'],
  // L : ???
  ['M', 'cbe', 'chungbuk', '충북', '충청북도'],
  ['N', 'cne', 'chungnam', '충남', '충청남도'],
  // O : ???
  ['P', 'jbe', 'jeonbuk', '전북', '전라북도'],
  ['Q', 'jne', 'jeonnam', '전남', '전라남도'],
  ['R', 'gbe', 'gyeongbuk', '경북', '경상북도'],
  ['S', 'gne', 'gyeongnam', '경남', '경상남도'],
  ['T', 'jje', 'jeju', '제주', '제주도']
]

const prefix = 'stu'

module.exports = (keyword) => {
  let select = false

  domains.forEach((domain) => {
    if (domain.includes(keyword)) {
      select = domain[0]
    }
  })

  const domain = code[select]

  return (domain)
    ? `${ prefix }.${ domain }.kr`
    : false
}
