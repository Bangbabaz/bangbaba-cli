const chalk = require('chalk')
const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const shell = require('shelljs')
const handlebars = require('handlebars')
const packageTemplate = require('../template/package.json')

function build (userConfig) {
    fs.mkdir(userConfig.name, function () {
        shell.cd(userConfig.name)
        const _data = {
            name: userConfig.name,
        }
        const result = handlebars.compile(JSON.stringify(packageTemplate))(_data)
        fs.writeFileSync('package.json', result)
        let command = ''
        for (let key in userConfig) {
            if (/Library/.test(key)) {
                command += userConfig[key] + ' --save '
            }
        }
        const spinner = ora('正在安装依赖...').start()
        shell.exec(`npm install ${command}`, function (code, stdout, stderr) {
            if (code) {
                spinner.fail('安装依赖失败')
            } else {
                spinner.succeed('安装依赖成功!')
            }
        })
    })
}

module.exports.build = build