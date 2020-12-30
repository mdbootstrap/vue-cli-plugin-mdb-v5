const fs = require('fs-extra')
const { EOL } = require('os')

const indexFileUpdate = () => {
  const contentApp = fs.readFileSync('./public/index.html', { encoding: 'utf-8' })
  const lines = contentApp.split(/\r?\n/g)

  const styleIndex = lines.findIndex(line => line.match(/<link/))

  if (lines.findIndex(line => line.match(/use.fontawesome.com/)) < 0) {
    lines[styleIndex] += `${EOL}    <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />`
  }

  fs.writeFileSync('./public/index.html', lines.join(EOL), { encoding: 'utf-8' })
}

module.exports = indexFileUpdate