import { judgeExistFold, downloadTemp, inquirerPrompt } from "./utils";
import path from "path";
import shell from "shelljs";
// 询问用户
const promptList = [
  {
    type: "checkbox",
    message: "请选择需要增加的页面:",
    name: "addPages",
    choices: ["common-table", "common-table-demo1"],
  },
];
module.exports = async () => {
  const { addPages } = await inquirerPrompt(promptList);
  downloadTemp(".hs-ui-template", async (data, dir) => {
    // console.log("process.cwd()", process.cwd()); // 当前项目 xxxx/create-add-download
    // console.log("__dirname", __dirname); //  xxxx/create-add-download/dist
    // 下载完成之后，移动文件位置
    for (const page of addPages) {
      const pagePath = path.join(dir, "src", "views", page);
      const targetPath = path.join(process.cwd(), "src", "views", page);
      judgeExistFold(targetPath);
      // 移动文件
      shell.mv(pagePath, targetPath);
      // 删除临时文件
    }
  });
};
