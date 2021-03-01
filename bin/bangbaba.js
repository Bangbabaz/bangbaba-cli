#!/usr/bin/evn node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const ora = require('ora')

program
    .version(require('../package.json').version)
    .command('create <name>')
    .description('create a new project')
    .action(name => {
        console.log(name)
        inquirer.prompt([
            {
                name: 'name',
                message: '请输入你的姓名',
                default: '张三'
            },
            {
                name: 'gender',
                type: 'list',
                message: '你的专业属于?',
                choices: [
                    '工科', '文科'
                ]
            }
        ]).then(res => {
            console.log(chalk.green(res.name))
            inquirer.prompt([
                {
                    name: 'major',
                    type: 'list',
                    message: '你的专业',
                    when: res.gender === '工科',
                    choices: [
                        '软件工程', '计算机科学与技术'
                    ]
                },
                {
                    name: 'major',
                    type: 'list',
                    message: '你的专业',
                    when: res.gender === '文科',
                    choices: [
                        '历史', '政治'
                    ]
                }
            ]).then(res => {
                const spinner = ora('下载资料中...').start()
                setTimeout(() => {
                    spinner.succeed('下载成功！')
                }, 5000)
            })

        })
    })

program.parse(process.argv);