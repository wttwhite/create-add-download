import ora from "ora"; // 终端loading显示
import path from "path";
import downloadGitRepo from "download-git-repo";
const waitLoading =
  (fn, message) =>
  async (...args) => {
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
    return result;
  };
const downloadTemp = (cb) => {
  const gitUrl =
    "direct:https://github.com/wttwhite/ui-template/archive/refs/heads/main.zip";
  // process.cwd() 执行文件夹的位置
  // __dirname 是被执行的js文件位置
  const dir = path.resolve(process.cwd(), "hs-ui-template");
  const spinner = ora("下载模板中...");
  spinner.start();
  downloadGitRepo(gitUrl, dir, (err) => {
    spinner.succeed();
    cb();
  });
};
module.exports = { waitLoading, downloadTemp };
