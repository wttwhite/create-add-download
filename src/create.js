import {
  judgeExistFold,
  downloadTemp,
  inquirerPrompt,
  updateContext,
  updatePackageJson,
  successAll,
} from "./utils";
// 询问用户
const promptList = [
  {
    type: "input",
    name: "context",
    message: "请输入项目上下文: ",
    default: "context-seat",
  },
  // {
  //   type: "list",
  //   message: "Please choice the project type:",
  //   name: "projectType",
  //   default: 0,
  //   choices: [
  //     {
  //       name: "一般表格表单页面",
  //       value: 0,
  //     },
  //     {
  //       name: "可视化大屏",
  //       value: 1,
  //     },
  //   ],
  // },
  {
    type: "checkbox",
    message: "请选择需要增加的依赖(空格选中):",
    name: "dependencies",
    choices: ["dayjs", "vuex", "hsja-utils"],
  },
];
module.exports = async (projectName) => {
  if (!projectName) {
    console.log(`Please input the Project name`);
    return;
  }
  // 判断文件是否存在
  await judgeExistFold(projectName);
  const answer = await inquirerPrompt(promptList);
  console.log("answer", answer);
  downloadTemp(projectName, async (data, dir) => {
    Promise.all([
      // 根据选择，增加依赖包
      updatePackageJson(`${dir}/package.json`, answer),
      // 将项目中的上下文改为输入的值
      updateContext(`${dir}/src/apis/http.js`, answer),
      updateContext(`${dir}/.env`, answer),
      updateContext(`${dir}/vue.config.js`, answer),
    ]).then(() => {
      successAll(projectName);
    });
    //
  });
};
