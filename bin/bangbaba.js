#!/usr/bin/evn node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const shell = require('shelljs')
const handlebars = require('handlebars')
const packageTemplate = require('../lib/template/package.json')

program
    .version(require('../package.json').version)
    .command('create <name>')
    .description('create a new project')
    .action(name => {
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'UILibrary',
                message: '请选择你要安装的UI库',
                choices: [
                    {
                        name: 'iView',
                        value: 'npm install view-design --save',
                    },
                    {
                        name: 'element',
                        value: 'npm install element-ui -S',
                    },
                ]
            }
        ]).then(res => {
            fs.mkdir(name, function () {
                const content = {
                    name: name
                }
                const result = handlebars.compile(JSON.stringify(packageTemplate))(content)
                console.log(result)
                shell.cd(name)
                fs.writeFile('package.json', result, function () {
                    const UILibrary = res.UILibrary.join(' ')
                    const spinner = ora('开始下载依赖...').start()
                    shell.exec(`npm install ${UILibrary}`, function (code, stdout, stderr) {
                        if (!code) {
                            spinner.stop(chalk.green('依赖安装完成！'))
                        } else {
                            spinner.stop()
                            console.log(chalk.yellow(stderr))
                        }
                    })
                })
            })
        })
    })

program.parse(process.argv);