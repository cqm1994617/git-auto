const fs = require('fs')
const rimraf = require('rimraf')
const { execSync } = require('child_process')
const iconv = require('iconv-lite')

const encoding = 'cp936'
const binaryEncoding = 'binary'
const FOLDER_NAME = 'commit_folder'

function iconvDecode(str = '') {
  return iconv.decode(Buffer.from(str, binaryEncoding), encoding)
}

rimraf.sync(__dirname + '/' + FOLDER_NAME)

fs.mkdirSync(FOLDER_NAME)

execSync('git init', {
  cwd: __dirname + '/' + FOLDER_NAME,
  encoding: "binary"
})

execSync('git remote add origin https://github.com/cqm1994617/commit-history.git', {
  cwd: `${__dirname}/${FOLDER_NAME}`
})

const date = [
  '2020-01-05 12:45:13',
  '2020-01-06 22:09:21',
  '2020-01-07 13:22:12',
  '2020-01-08 16:15:16',
  '2020-01-09 15:31:44',
  '2020-01-10 23:15:58',
  '2020-01-11 12:33:09'
]

date.forEach(item => {
  fs.writeFileSync(`${__dirname}/${FOLDER_NAME}/index.txt`, Math.random().toString(), 'utf8')
  execSync('git add .', {
    cwd: __dirname + '/' + FOLDER_NAME
  })
  execSync(`git commit --date "${item}" -m "save"`, {
    cwd: __dirname + '/' + FOLDER_NAME,
    encoding: "binary"
  })
})

execSync('git push --force origin master', {
  cwd: `${__dirname}/${FOLDER_NAME}`,
  encoding: "binary"
})
