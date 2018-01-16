module.exports = [
  { 
    displayName: '品种管理',
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