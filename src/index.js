import commander from "commander";
import create from "./create";
import add from "./add";

// 增加创建和新增一个页面的命令
const actionMap = {
  create: {
    description: "创建一个新的项目",
    // usages: ["hs create ProjectName"],
    alias: "c",
  },
  add: {
    description: "工程目录下添加一个新页面",
    // usages: ["hs add a new view"],
    alias: "a",
  },
};
Object.keys(actionMap).forEach((key) => {
  const { description, alias } = actionMap[key];
  // if (options) {
  //   Object.keys(options).forEach((optKey) => {
  //     const obj = options[optKey];
  //     commander.option(obj.flags, obj.description, obj.defaultValue);
  //   });
  // }
  commander
    .command(key)
    .description(description)
    .alias(alias)
    .action(() => {
      switch (key) {
        case "create":
          create(...process.argv.slice(3));
          break;
        case "add":
          add(...process.argv.slice(3));
          break;
        default:
          break;
      }
    });
});

commander.version(require("../package.json").version, "-v -V --version");
// parse(process.argv)接收参数，一定要放后面,所有指令注册结束后再执行 program.parse()
commander.parse(process.argv);
// 当命令后面没有跟action的时候，给出提示
if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
