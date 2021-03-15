const fs = require("fs-extra");

const applySCSS = version => {
  fs.copy("./node_modules/mdb-vue-ui-kit/src/scss", "./mdb/scss", err => {
    if (err) throw err;
  });

  const { EOL } = require("os");
  const contentApp = fs.readFileSync("./src/App.vue", { encoding: "utf-8" });
  const lines = contentApp.split(/\r?\n/g);

  const styleIndex = lines.findIndex(line => line.match(/<style/));

  if (lines.findIndex(line => line.match(/mdb\/scss/)) < 0) {
    lines[styleIndex] = '<style lang="scss">';
    if (version === "Pro") {
      lines[styleIndex] += `${EOL}@import '~@/../mdb/scss/index.pro.scss';`;
    } else {
      lines[styleIndex] += `${EOL}@import '~@/../mdb/scss/index.free.scss';`;
    }
    lines[styleIndex] += `${EOL}`;
    fs.writeFileSync("./src/App.vue", lines.join(EOL), { encoding: "utf-8" });
  }
};

module.exports = applySCSS;
