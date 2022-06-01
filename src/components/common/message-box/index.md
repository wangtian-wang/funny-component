分析思路

两种调用方式

    message({}).then()

    message.warning({})

动态创建组件的方式

    const app = createApp() 创建一个组件实例

    app.$mount()$ 在调用他的页面中 将该**组件渲染**到视图中

使用动态创建组件的方式 不能使用过渡效果,所以要使用 V-show 显示的切换 dom 的显示和隐藏

思考: 全局注册的组件 和 方法调用渲染挂载的组件???

createApp()将跟组件 app.vue 挂载到 html 中

component 局部注册 是将组件注册到当前页面 这个是怎样实现的呢???

.vue .ts 文件里面定义的变量是不想通的

.vue 文件里面定义的是 vm 实例上的属性

.ts 文件里面定义的是纯 js 的东西 .ts 文件里面引入了.vue 文件 会得到组件的渲染函数

想要使用.vue 文件里面的变量就必须通过 defineExpose()将想要暴露出去的变量传递出去
