module.exports = (projectName) => {
  console.log("create", projectName);
  if (!projectName) {
    console.log(`Please input the Project name`);
  }
};
