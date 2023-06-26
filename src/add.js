import { judgeExistFold, downloadTemp, inquirerPrompt, delFile } from "./utils";
import path from "path";
import shell from "shelljs";
// 询问用户
const promptViewList = [
  {
    type: "checkbox",
    message: "请选择需要增加的页面:",
    name: "addPages",
    choices: ["common-table", "common-table-demo1"],
  },
];
const promptComList = [
  {
    type: "checkbox",
    message: "请选择需要增加的组件:",
    name: "addPages",
    choices: ["hs-pagination"],
  },
];
module.exports = async (typeName) => {
  console.log("typeName", typeName);
  let promptList = promptViewList;
  if (!typeName) {
    typeName = "views";
  } else if (typeName.indexOf("com") > -1) {
    typeName = "components";
    promptList = promptComList;
  } else {
    typeName = "views";
  }
  const { addPages } = await inquirerPrompt(promptList);
  console.log("addPages", addPages);
  if (!addPages || addPages.length === 0) {
    console.log("请选择需要增加的页面/组件");
    return;
  }
  downloadTemp(".hs-ui-template", async (data, dir) => {
    // console.log("process.cwd()", process.cwd()); // 当前项目 xxxx/create-add-download
    // console.log("__dirname", __dirname); //  xxxx/create-add-download/dist
    // 下载完成之后，移动文件位置
    for (const page of addPages) {
      const pagePath = path.join(dir, "src", typeName, page);
      const targetPath = path.join(process.cwd(), "src", typeName, page);
      judgeExistFold(targetPath);
      // 移动文件
      shell.mv(pagePath, targetPath);
    }
    // 删除临时文件
    delFile(dir, true);
  });
};
