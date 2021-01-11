const updateMainJS = require('./commands/updateMainJS')
const applyRoboto = require('./commands/applyRoboto')
const applyFA5 = require('./commands/applyFA5')

const remoteGitTags = require('remote-git-tags')

// check for the latest mdb version
let latestTag = '1.0.0-alpha1'
remoteGitTags('https://github.com/mdbootstrap/mdb-vue-ui-kit').then(tags => {
  latestTag = Array.from(tags)[Array.from(tags).length - 1][0];
})

module.exports = async (api, options) => {
  // extend existing config
  api.extendPackage({
    scripts: {
      start: 'vue-cli-service serve --open'
    },
    dependencies: {
      'mdb-vue-ui-kit': `^${latestTag}`
    }
  })

  api.onCreateComplete(() => {
    updateMainJS(api.entryFile)
  })

  // apply Roboto font
  if (options.roboto === true) {
    api.onCreateComplete(() => {
      applyRoboto()
    })
  }

  // apply Font Awesome
  if (options.fa5 === true) {
    api.onCreateComplete(() => {
      applyFA5()
    })
  }

  api.exitLog('MDB is ready for coding!', 'done')
}