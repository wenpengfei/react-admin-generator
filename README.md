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




