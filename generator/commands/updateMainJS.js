const { EOL } = require('os')
const fs = require('fs-extra')

const updateMainJS = (entry) => {
  const contentMain = fs.readFileSync(entry, { encoding: 'utf-8' })
  const lines = contentMain.split(/\r?\n/g)

  // check existing imports & apply if needed
  if (lines.findIndex(line => line.match(/mdb-vue-ui-kit/)) < 0) {
    lines.unshift("import 'mdb-vue-ui-kit/css/mdb.min.css'")
  }

  fs.writeFileSync(entry, lines.join(EOL), { encoding: 'utf-8' })
}

module.exports = updateMainJS