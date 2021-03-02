const inquirer = require('inquirer')
const config = require('./util/config')

async function create (name) {
    const { edition } = await inquirer.prompt([
        {
            type: 'list',
            name: 'edition',
            message: '请选择要安装的版本:',
            default: 'default',
            choices: [
                {
                    name: '默认',
                    value: 'Default'
                },
                {
                    name: '纯净版',
                    value: 'Clean',
                },
                {
                    name: '自定义',
                    value: 'Custom'
                }
            ]
        },
    ])
    require(`./create${edition}`)[`create${edition}`](name)
}

module.exports.create = create