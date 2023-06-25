import {
  judgeExistFold,
  downloadTemp,
  inquirerPrompt,
  renderTemplate,
  updatePackageJson,
} from "./utils";
// 询问用户
const promptList = [
  {
    type: "input",
    name: "content",
    message: "请输入项目上下文: ",
  },
  {
    type: "list",
    message: "Please choice the project type:",
    name: "projectType",
    default: 0,
    choices: [
      {
        name: "一般表格表单页面",
        value: 0,
      },
      {
        name: "可视化大屏",
        value: 1,
      },
    ],
  },
];
module.exports = async (projectName) => {
  console.log("create", projectName);
  if (!projectName) {
    console.log(`Please input the Project name`);
    return;
  }
  // 判断文件是否存在
  await judgeExistFold(projectName);
  downloadTemp(async (data, dir) => {
    const answer = await inquirerPrompt(promptList);
    console.log("answer", answer);
    // 渲染模板

    // renderTemplate(data);
    updatePackageJson(`${dir}/package.json`, answer);
  });
};
