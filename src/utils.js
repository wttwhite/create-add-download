import ora from "ora"; // 终端loading显示
import path from "path";
import downloadGitRepo from "download-git-repo";
import metalSmith from "metalsmith";
import inquirer from "inquirer";
import fs from "fs";
import shell from "shelljs";
const downloadTemp = (cb) => {
  const gitUrl =
    "direct:https://github.com/wttwhite/ui-template/archive/refs/heads/main.zip";
  // process.cwd() 执行文件夹的位置
  // __dirname 是被执行的js文件位置
  const dir = path.resolve(process.cwd(), ".hs-ui-template");
  const spinner = ora("下载模板中...");
  spinner.start();
  downloadGitRepo(gitUrl, dir, (err, data) => {
    spinner.succeed();
    cb && cb(data, dir);
  });
};
const renderTemplate = (data) => {};
// 判断文件是否存在
const judgeExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(
        symbol.error,
        chalk.red(
          "The folder name already exists, please change the name and create again."
        )
      );
    } else {
      resolve();
    }
  });
};
const inquirerPrompt = (promptList) => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(promptList)
      .then((answer) => {
        resolve(answer);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// 更新json配置文件
const updatePackageJson = (filePath, answer) => {
  console.log("filePath", filePath);
  shell.chmod("777", filePath);
  return new Promise((resolve) => {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath).toString();
      let json = JSON.parse(data);
      json.name = answer.content;
      fs.writeFileSync(filePath, JSON.stringify(json, null, "\t"), "utf-8");
      resolve();
    }
  });
};
module.exports = {
  judgeExistFold,
  downloadTemp,
  inquirerPrompt,
  updatePackageJson,
  renderTemplate,
};
