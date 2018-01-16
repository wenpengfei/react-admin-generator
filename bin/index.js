#!/usr/bin/env node

const program = require('commander');
const fs = require('fs')
const copy = require('kopy')
const path = require('path')
const Handlebars = require('handlebars')
const chalk = require('chalk')
const rimraf = require('rimraf')

const helpers = require('handlebars-helpers')({
  handlebars: Handlebars
})

Handlebars.registerHelper('wapperContent', function(content, suffix) {
  return `{${content + suffix}}`
});

let data = []
let dest = ''

program
  .version('1.0.0')
  .option('-c, --config [config file name]', 'configs')
  .option('-d, --dest [dest folder name]', 'dest folder', 'dest')
  .parse(process.argv);

if (program.config) {
  data = require(path.resolve(process.cwd(), program.config))
} else {
  console.log(chalk.red('error: must provide config file name'))
  process.exit(1)
}

if (program.dest) {
  dest = path.resolve(process.cwd(), program.dest)
} else {
  dest = path.resolve(process.cwd(), 'generated-api')
}

if (fs.existsSync(dest)) {
  rimraf(dest, () => fs.mkdirSync(dest))
} else {
  fs.mkdirSync(dest)
}

const serviceSource = fs.readFileSync(path.resolve(__dirname, '../template/src/service.hbs'), 'utf8')
const serviceIndexSource = fs.readFileSync(path.resolve(__dirname, '../template/src/service-index.hbs'), 'utf8')

const storeSource = fs.readFileSync(path.resolve(__dirname, '../template/src/store.hbs'), 'utf8')
const storeIndexSource = fs.readFileSync(path.resolve(__dirname, '../template/src/store-index.hbs'), 'utf8')

const viewAddSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-add.hbs'), 'utf8')
const viewEditSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-edit.hbs'), 'utf8')
const viewFormSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-form.hbs'), 'utf8')
const viewIndexSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-index.hbs'), 'utf8')
const viewListSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-list.hbs'), 'utf8')
const viewTableSource = fs.readFileSync(path.resolve(__dirname, '../template/src/view-table.hbs'), 'utf8')
const viewsIndexSource = fs.readFileSync(path.resolve(__dirname, '../template/src/views-index.hbs'), 'utf8')

const routesSource = fs.readFileSync(path.resolve(__dirname, '../template/src/routes.hbs'), 'utf8')
const pagesSource = fs.readFileSync(path.resolve(__dirname, '../template/src/pages.hbs'), 'utf8')

const serviceTemplate = Handlebars.compile(serviceSource)
const serviceIndexTemplate = Handlebars.compile(serviceIndexSource)

const storeTemplate = Handlebars.compile(storeSource)
const storeIndexTemplate = Handlebars.compile(storeIndexSource)

const viewAddTemplate = Handlebars.compile(viewAddSource)
const viewEditTemplate = Handlebars.compile(viewEditSource)
const viewFormTemplate = Handlebars.compile(viewFormSource)
const viewIndexTemplate = Handlebars.compile(viewIndexSource)
const viewListTemplate = Handlebars.compile(viewListSource)
const viewTableTemplate = Handlebars.compile(viewTableSource)
const viewsIndexTemplate = Handlebars.compile(viewsIndexSource)

const routesTemplate = Handlebars.compile(routesSource)
const pagesTemplate = Handlebars.compile(pagesSource)


const writeFile = (filePath, content)  => fs.writeFile(filePath, content, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.green(`${filePath} was saved!`))
})

copy(path.resolve(__dirname, '../template'), dest, {
  clean: true,
  glob:[
    '**',
    '!**/node_modules/**',
    '!**/*.hbs/**',
  ]
}).then(() => {
  // save entry files
  writeFile(`${dest}/src/service/index.ts`, serviceIndexTemplate(data))
  writeFile(`${dest}/src/stores/index.ts`, storeIndexTemplate(data))
  writeFile(`${dest}/src/views/index.ts`, viewsIndexTemplate(data))
  writeFile(`${dest}/src/routes.ts`, routesTemplate(data))
  writeFile(`${dest}/src/pages.tsx`, pagesTemplate(data))

  data.forEach(item => {
    const folderName = fileName = helpers.lowercase(item.modelName)

    fs.mkdirSync(`${dest}/src/service/${folderName}`)
    writeFile(`${dest}/src/service/${folderName}/index.ts`, serviceTemplate(item))

    fs.mkdirSync(`${dest}/src/stores/${folderName}`)
    writeFile(`${dest}/src/stores/${folderName}/index.ts`, storeTemplate(item))

    fs.mkdirSync(`${dest}/src/views/${folderName}`)
    writeFile(`${dest}/src/views/${folderName}/add.tsx`, viewAddTemplate(item))
    writeFile(`${dest}/src/views/${folderName}/edit.tsx`, viewEditTemplate(item))
    writeFile(`${dest}/src/views/${folderName}/form.tsx`, viewFormTemplate(item))
    writeFile(`${dest}/src/views/${folderName}/index.tsx`, viewIndexTemplate(item))
    writeFile(`${dest}/src/views/${folderName}/list.tsx`, viewListTemplate(item))
    writeFile(`${dest}/src/views/${folderName}/table.tsx`, viewTableTemplate(item))
  })
}).catch(err => {
  console.log(err.stack)
})

