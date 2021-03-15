const isPro = answers => {
  return answers.version === "Pro";
};

module.exports = [
  {
    name: "version",
    type: "list",
    message: "Free or Pro version?",
    choices: ["Free", "Pro"],
    default: "Free"
  },
  {
    name: "token",
    type: "input",
    message: "Please enter your gitlab token:",
    when: isPro
  },
  {
    name: "roboto",
    type: "confirm",
    message: "Add Roboto font?",
    default: true
  },
  {
    name: "fa5",
    type: "confirm",
    message: "Add Font Awesome 5?",
    default: true
  },
  {
    name: "styling",
    type: "list",
    message: "Select the styling option:",
    choices: [
      "Compiled in the package (CSS)",
      "Editable in your project (SCSS)"
    ],
    default: "Compiled in the package (CSS)"
  },
  {
    name: "welcomePage",
    type: "confirm",
    message: "Add MDB welcome page?",
    default: true
  }
];
