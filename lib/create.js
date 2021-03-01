const inquirer = require('inquirer')
const creator = new creator()

const promptModules = getPromptModules()
const promptAPI = new PromptModuleAPI(creator)

clearConsole()

const answers = await inquirer.prompt(creator.getFinalPrompts())

function getPromptModules() {
    return [
        'babel',
        'router',
        'vuex',
        'linter',
    ].map(file => require(`./promptModules/${file}`))
}

class Creator {
    constructor() {
        this.featurePrompts = {
            name: 'features',
            message: 'Check the features needed for your project:',
            type: 'checkbox',
            choices: [],
        }

        this.injectedPrompts = []
    }

    getFinalPrompts() {
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true)
            prompt.when = answers => originalWhen(answers)
        })

        const prompts = [
            this.featurePrompts,
            ...this.injectedPrompts,
        ]

        return prompts
    }
}

module.exports = Creator

module.exports = class PromptModuleAPI {
    
}