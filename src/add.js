import {
  judgeExistFold,
  judgeNotExistFold,
  downloadTemp,
  inquirerPrompt,
  delFile,
  addSuccess,
} from "./utils";
import path from "path";
import shell from "shelljs";
// 询问用户
const propTypeList = [
  {
    type: "list",
    message: "请选择新增页面还是组件:",
    name: "addType",
    default: "views",
    choices: [
      {
        name: "页面",
        value: "views",
      },
      {
        name: "组件",
        value: "components",
      },
    ],
  },
];
const promptObj = {
  views: [
    {
      type: "checkbox",
      message: "请选择需要增加的页面:",
      name: "addPages",
      choices: ["common-table", "common-table-demo1"],
    },
    {
      type: "input",
      message: "请输入需要增加的页面:",
      name: "addInput",
      when: function (answer) {
        return answer.addPages.length === 0;
      },
    },
  ],
  components: [
    {
      type: "checkbox",
      message: "请选择需要增加的组件:",
      name: "addPages",
      choices: ["hs-pagination"],
    },
    {
      type: "input",
      message: "请输入需要增加的组件:",
      name: "addInput",
      when: function (answer) {
        return answer.addPages.length === 0;
      },
    },
  ],
};
module.exports = async () => {
  let { addType } = await inquirerPrompt(propTypeList);
  let { addPages, addInput } = await inquirerPrompt(promptObj[addType]);
  // console.log("addPages", addPages);
  if (!addPages || addPages.length === 0) {
    if (addInput) {
      addPages = [addInput];
    } else {
      console.log("未输入需要增加的页面/组件文件名");
      return;
    }
  }
  downloadTemp(".hs-ui-template", async (data, dir) => {
    // console.log("process.cwd()", process.cwd()); // 当前项目 xxxx/create-add-download
    // console.log("__dirname", __dirname); //  xxxx/create-add-download/dist
    // 下载完成之后，移动文件位置
    for (const page of addPages) {
      const pagePath = path.join(dir, "src", addType, page);
      const targetPath = path.join(process.cwd(), "src", addType, page);
      // try catch可以保证循环一个出错，不影响其他循环项执行
      try {
        await judgeNotExistFold(pagePath, `源文件${addType}中不存在${page}`);
        await judgeExistFold(targetPath, `${addType}文件中已存在${page}`);
        // 移动文件
        shell.mv(pagePath, targetPath);
      } catch (error) {}
    }
    // 删除临时文件
    delFile(dir);
    addSuccess();
  });
};
