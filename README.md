# vue-cli3-web-init

## 框架说明

- [vue] https://cn.vuejs.org/
- [element-ui] https://element.eleme.cn/#/zh-CN
- [vuex] https://vuex.vuejs.org/zh/guide/
- [axios] https://www.kancloud.cn/yunye/axios/234845

## 项目说明

1. 代码规范

   [空格] 统一两个空格

   [文件命名] 统一以`-`中划线隔开 ex: task-list.vue

   [样式命名] 统一以`-`中划线隔开 ex: .task-list

   [语法] 统一采用 es6 语法，一般情况下不写分号`;`

2. 公共文件

   - css/\*

     [theme.scss] 自定义全局样式

     [mixin.scss] 自定义变量、混合指令等

3. 文件路径使用例子

   [css] `background: url(~@images/no-data.svg) center center no-repeat;`

   [js] `defaultPanelImg: require('@assets/images/default-panel.png')`

## eslint + prettier 使用

VScode 安装插件：[Vetur][prettier][Eslint]

禁用冲突的插件：[Beautify]

`新建.eslintrc.js`
`新建.prettierrc`

## 项目启动

npm i

npm run dev

## 代码规范检查

npm run lint

## 项目打包

npm run build
