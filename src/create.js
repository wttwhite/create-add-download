import { waitLoading, downloadTemp } from "./utils";
import downloadGitRepo from "download-git-repo";
import path from "path";
module.exports = (projectName) => {
  console.log("create", projectName);
  if (!projectName) {
    console.log(`Please input the Project name`);
    return;
  }
  downloadTemp();
};
