const updateMainJS = require("./commands/updateMainJS");
const applyRoboto = require("./commands/applyRoboto");
const applyFA5 = require("./commands/applyFA5");
const packTgz = require("./commands/packTgz");
const applySCSS = require("./commands/applySCSS");

const remoteGitTags = require("remote-git-tags");

// check for the latest mdb version
let latestTag = "1.0.0-alpha1";
remoteGitTags("https://github.com/mdbootstrap/mdb-vue-ui-kit").then(tags => {
  latestTag = Array.from(tags)[Array.from(tags).length - 1][0];
});

module.exports = async (api, options) => {
  // extend existing config
  if (options.version === "Free") {
    api.extendPackage({
      scripts: {
        start: "vue-cli-service serve --open"
      },
      dependencies: {
        "mdb-vue-ui-kit": `^${latestTag}`
      }
    });
  } else {
    api.render("./templates/pro");
    api.extendPackage({
      scripts: {
        start: "vue-cli-service serve --open"
      },
      dependencies: {
        "mdb-vue-ui-kit": `git+https://oauth2:${options.token}@git.mdbootstrap.com/mdb/vue/mdb5/prd/mdb5-vue-ui-kit-pro-essential.git`
      }
    });
  }

  // apply Roboto font
  if (options.roboto === true) {
    api.onCreateComplete(() => {
      applyRoboto();
    });
  }

  // apply Font Awesome
  if (options.fa5 === true) {
    api.onCreateComplete(() => {
      applyFA5();
    });
  }

  // apply welcome page
  if (options.welcomePage === true) {
    api.render("./templates/welcomePage");
  }

  // apply SCSS config
  if (options.styling === "Editable in your project (SCSS)") {
    api.extendPackage({
      devDependencies: {
        sass: "^1.26.5",
        "sass-loader": "^8.0.2"
      }
    });
    api.onCreateComplete(() => {
      applySCSS(options.version);
    });
  } else {
    api.onCreateComplete(() => {
      updateMainJS(api.entryFile);
    });
  }

  // npm pack & replace dependency by tgz
  if (options.version === "Pro") {
    api.onCreateComplete(() => {
      packTgz(latestTag, options.token);
    });
  }

  api.exitLog("MDB is ready for coding!", "done");
};
