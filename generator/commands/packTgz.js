const packlist = require('npm-packlist')
const tar = require('tar')

const packTgz = (tag, token) => {
  const packageDir = './node_modules/mdb-vue-ui-kit'
  const packageTarball = `./mdb/mdb-vue-ui-kit-${tag}.tgz`

  packlist({ path: packageDir })
    .then(files => tar.create({
      prefix: 'package/',
      cwd: packageDir,
      file: packageTarball,
      gzip: true
    }, files))
    .then(() => {
      const replace = require('replace-in-file');
      const replaceOptions = {
        files: './package.json',
        from: `git+https://oauth2:${token}@git.mdbootstrap.com/mdb/vue/mdb5/prd/mdb5-vue-ui-kit-pro-essential.git`,
        to: `./mdb/mdb-vue-ui-kit-${tag}.tgz`,
      };
      try {
        replace.sync(replaceOptions);
      }
      catch (error) { }
    })
}

module.exports = packTgz