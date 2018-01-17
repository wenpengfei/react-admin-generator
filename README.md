# react-admin-generator

A generator for https://github.com/wenpengfei/parcel-typescript-react-boilerplate

## Install

`yarn global add react-admin-generator` or `npm install -g react-admin-generator`

## Usage

`create-react-admin -c example.js`

example.js:

```
module.exports = [
  { 
    displayName: '品种',
    key: 'varietyId', 
    modelName: 'Variety',
    modelPluralName: 'Varieties',
    properties: [
      {
        type: 'String',
        displayName: '名称',
        name: 'name'
      },
      { 
        type: 'String',
        displayName: '数量',
        name: 'qty'
      },
    ]
  },
]
```

## Tech Stack

### Core

* [typescript](https://www.typescriptlang.org/)
* [react@v16](https://reactjs.org/)
* [react-router@v4](https://reacttraining.com/react-router/)
* [mobx](https://mobx.js.org/index.html)
* [mobx-react](https://github.com/mobxjs/mobx-react)

### Utils

* [parcel](https://parceljs.org)
* [tslint](https://palantir.github.io/tslint/)
* [stylelint](https://stylelint.io/)

## Structure

```
├── src
│   ├── app.scss
│   ├── app.tsx                      # 入口文件
│   ├── pages.tsx                    # 模板页
│   ├── routes.ts                    # 菜单
│   ├── assets                       # 资源文件
│   │   └── logo.svg
│   ├── components                   # 组件目录
│   │   ├── content-container        # 页面container
│   │   │   └── index.tsx   
│   │   ├── index.tsx                # components 入口文件
│   │   ├── layout                   # 布局页
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   ├── login-form               # 登陆组件
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   └── router-link
│   │       └── index.tsx
│   ├── service                      # api
│   │   ├── base.ts
│   │   ├── index.ts                 # api 入口文件
│   │   └── user
│   │       └── index.ts
│   ├── stores                       # mobx store
│   │   ├── app
│   │   │   └── index.ts
│   │   ├── base.ts
│   │   ├── index.ts                 # store 入口文件 
│   │   ├── member
│   │   │   └── index.ts
│   │   └── user
│   │       └── index.ts
│   ├── utils                        # 工具类
│   │   ├── auth.ts
│   │   ├── fetch.ts
│   │   ├── index.ts                 # 工具类入口文件
│   │   └── validator.ts
│   └── views                        # 页面
│       ├── index.ts
│       ├── login
│       │   └── index.tsx
│       ├── member
│       │   └── index.tsx
│       ├── not-found
│       │   └── index.tsx
│       └── user
│           ├── add.tsx
│           ├── edit.tsx
│           ├── form.tsx
│           ├── index.tsx
│           ├── list.tsx
│           └── table.tsx
├── index.html
├── tsconfig.json
├── tslint.json
├── yarn-error.log
└── yarn.lock
├── README.md
├── package.json
```





