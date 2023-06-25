# create-add-download

* axios (发送请求，promise封装)
* ora (等待loading)
* inquirer (询问选择命令)
* download-git-repo (从github上拉取仓库)
* ncp (拷贝文件到指定目录下)

[目录描述] 通过axios发送请求，获取github上的仓库和版本号(ps: 见[github开发者文档-repo](https://developer.github.com/v3/repos))，通过inquirer与开发者进行命令行交互，ora优化用户体验，download-git-repo将仓库下载到对应的目录下，通常为.template下，再通过ncp将下载的文件直接拷贝到指定的目录下



inquirer 9.2.7不行
