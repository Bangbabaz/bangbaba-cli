const inquirer = require('inquirer')
const { build } = require('./util/build')

async function createCustom (name) {
    console.log(`自定义版: ${name}`)
    const { libraryOK } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'libraryOK',
            message: '是否安装 UI 库?',
        }
    ])
    const { UILibrary } = await inquirer.prompt([
        {
            when: libraryOK,
            type: 'list',
            name: 'UILibrary',
            message: '请选择要安装的 UI 库:',
            choices: [{ name: 'iView', value: 'view-design' }, 'Element'],
        }
    ])
    const { requestOK } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'requestOK',
            message: '是否安装请求库?',
        }
    ])
    const { requestLibrary } = await inquirer.prompt([
        {
            when: requestOK,
            type: 'list',
            name: 'requestLibrary',
            message: '请选择要安装的请求库:',
            choices: ['axios', 'ajax'],
        }
    ])
    const userConfig = {
        name,
        UILibrary: libraryOK ? UILibrary : [],
        requestLibrary: requestOK ? requestLibrary : [],
    }
    build(userConfig)
}

module.exports.createCustom = createCustom