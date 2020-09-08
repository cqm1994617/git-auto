const fs = require('fs')
const { execSync } = require('child_process')
const iconv = require('iconv-lite')

const encoding = 'cp936'
const binaryEncoding = 'binary'

function iconvDecode(str = '') {
  return iconv.decode(Buffer.from(str, binaryEncoding), encoding)
}
if (!fs.existsSync('ab')) {
  fs.mkdirSync('ab')
}

execSync('cd ab')

const a = execSync('git init', {
  cwd: __dirname + '/ab',
  encoding: "binary"
})

console.log(iconvDecode(a))