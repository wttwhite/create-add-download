import commander from "commander";
import path from "path";
// 增加创建和新增一个页面的命令
const actionMap = {
  create: {
    description: "创建一个新的项目:hs-cli create ProjectName",
    alias: "c",
  },
  add: {
    description: "工程目录下添加一个新页面",
    // usages: ["hs add a new view"],
    alias: "a",
  },
  // 其他命令
  "*": {
    description: "commander not found",
    alias: "",
  },
};
Object.keys(actionMap).forEach((key) => {
  const { description, alias } = actionMap[key];
  commander
    .command(key)
    .description(description)
    .alias(alias)
    .action(() => {
      if (key === "*") {
        console.log(description);
      } else {
        require(path.resolve(__dirname, key))(...process.argv.slice(3));
      }
    });
});

commander.version(require("../package.json").version, "-v -V --version");
// parse(process.argv)接收参数，一定要放后面,所有指令注册结束后再执行 .parse()
commander.parse(process.argv);
// 当命令后面没有跟action的时候，给出提示
if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
