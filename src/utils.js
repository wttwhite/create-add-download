import ora from "ora"; // 终端loading显示
import path from "path";
import downloadGitRepo from "download-git-repo";
import inquirer from "inquirer";
import fs from "fs";
import shell from "shelljs";
import logSymbol from "log-symbols";
import chalk from "chalk";
const downloadTemp = (fileName, cb) => {
  const gitUrl =
    "direct:https://github.com/wttwhite/ui-template/archive/refs/heads/main.zip";
  // process.cwd() 执行文件夹的位置
  // __dirname 是被执行的js文件位置
  const dir = path.resolve(process.cwd(), fileName);
  const spinner = ora("下载模板中...");
  spinner.start();
  downloadGitRepo(gitUrl, dir, (err, data) => {
    spinner.succeed();
    cb && cb(data, dir);
  });
};
// 判断文件是否存在
const judgeExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(
        logSymbol.error,
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
  shell.chmod("777", filePath);
  const { context, dependencies } = answer;
  return new Promise((resolve) => {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath).toString();
      let json = JSON.parse(data);
      json.name = context;
      if (dependencies.includes("vuex")) {
        json.dependencies.vuex = "^3.6.2";
      }
      if (dependencies.includes("dayjs")) {
        json.devDependencies.dayjs = "^1.11.7";
      }
      if (dependencies.includes("hsja-utils")) {
        json.devDependencies["hsja-utils"] = "latest";
      }
      fs.writeFileSync(filePath, JSON.stringify(json, null, "\t"), "utf-8");
      resolve();
    }
  });
};
// 更新文档中涉及到的上下文
const updateContext = (filePath, answer) => {
  shell.chmod("777", filePath);
  return new Promise((resolve) => {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath).toString();
      fs.writeFileSync(
        filePath,
        data.replace(/context-seat/g, answer.context),
        "utf-8"
      );
      resolve();
    }
  });
};
// 如果有vuex则要更改项目中相关文件
const updateByVueStore = (fatherFilePath, answer) => {
  const mainJsPath = path.join(fatherFilePath, "main.js");
  shell.chmod("777", mainJsPath);
  return new Promise((resolve) => {
    const data = fs.readFileSync(mainJsPath).toString();
    if (answer.dependencies.includes("vuex")) {
      fs.writeFileSync(
        mainJsPath,
        data
          .replace(
            /\/\/ import store from \'@\/store\'/,
            `import store from '@/store'`
          )
          .replace(/\/\/ store,/, `store,`),
        "utf-8"
      );
    } else {
      fs.writeFileSync(
        mainJsPath,
        data
          .replace(/\/\/ import store from \'@\/store\'/, ``)
          .replace(/\/\/ store,/, ``),
        "utf-8"
      );
      // 删除store文件, 要先删除文件，不然会报文件夹非空
      fs.unlinkSync(path.join(fatherFilePath, "store", "index.js"));
      fs.rmdirSync(path.join(fatherFilePath, "store"));
    }
    resolve();
  });
};

const successAll = (projectName) => {
  console.log(
    logSymbol.success,
    chalk.white(
      `${
        `let we start developing the ${projectName}!\n\n` +
        chalk.cyan(`${chalk.gray("$")} cd ${projectName}\n`) +
        chalk.cyan(`${chalk.gray("$")} npm install\n`) +
        chalk.cyan(`${chalk.gray("$")} npm run serve`)
      }`
    )
  );
};

//删除目录下的所有文件
const delFile = (fileUrl, isDirectory) => {
  if (!fs.existsSync(fileUrl)) return;
  if (fs.statSync(fileUrl).isDirectory()) {
    // 当前文件为文件夹时
    var files = fs.readdirSync(fileUrl);
    var len = files.length,
      removeNumber = 0;
    if (len > 0) {
      files.forEach(function (file) {
        removeNumber++;
        var stats = fs.statSync(fileUrl + "/" + file);
        var url = fileUrl + "/" + file;
        if (fs.statSync(url).isDirectory()) {
          delFile(url, true);
        } else {
          fs.unlinkSync(url);
        }
      });
      if (len == removeNumber && isDirectory) {
        fs.rmdirSync(fileUrl);
      }
    } else if (len == 0 && isDirectory) {
      fs.rmdirSync(fileUrl);
    }
  } else {
    // 当前文件为文件时
    fs.unlinkSync(fileUrl);
    console.log("删除文件" + fileUrl + "成功");
  }
};
module.exports = {
  judgeExistFold,
  downloadTemp,
  inquirerPrompt,
  updatePackageJson,
  updateContext,
  successAll,
  updateByVueStore,
};
