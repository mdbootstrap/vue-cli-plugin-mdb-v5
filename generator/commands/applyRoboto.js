const fs = require('fs-extra')
const { EOL } = require('os')

const filesUpdate = () => {
  // index.html
  const contentIndex = fs.readFileSync('./public/index.html', { encoding: 'utf-8' })
  const linesIndex = contentIndex.split(/\r?\n/g)

  const styleIndexKey = linesIndex.findIndex(line => line.match(/<link/))

  if (linesIndex.findIndex(line => line.match(/family=Roboto/)) < 0) {
    linesIndex[styleIndexKey] += `${EOL}    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />`
  }

  fs.writeFileSync('./public/index.html', linesIndex.join(EOL), { encoding: 'utf-8' })

  // App.vue
  const contentApp = fs.readFileSync('./src/App.vue', { encoding: 'utf-8' })
  const linesApp = contentApp.split(/\r?\n/g)

  const styleAppKey = linesApp.findIndex(line => line.match(/font-family:/))

  if (linesApp.findIndex(line => line.match(/font-family: Roboto/)) < 0) {
    linesApp[styleAppKey] = '  font-family: Roboto, Helvetica, Arial, sans-serif;'
  }

  fs.writeFileSync('./src/App.vue', linesApp.join(EOL), { encoding: 'utf-8' })
}

module.exports = filesUpdate