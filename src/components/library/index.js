// library 库的入口文件
// 扩展vue原有的功能 全局组件 自定义指令 挂载原型方法 主语: 没有全局过滤器
// vue2.0插件写法要素: 导出一个对象 有install函数 默认传入了Vue构造器 Vue基础之上扩展
// vue3.0插件写法要素: 导出一个对象 有install函数 默认传入了App应用实例 app基础之上扩展
// import nmSkelect from './nmSkelect.vue'
// import nmSwipe from './nmSwipe.vue'
// import nmMore from './nm-more.vue'
// import nmBread from './nmbread.vue'
// import nmBreadItem from './nm_bread_item.vue'
import Confirm from './Confirm'
import defaultImg from '@/assets/images/default.jpg'
export default {
    install(app) {
        // 在app上进行扩展 app提供component directive 指定
        //  如果挂载原型 app.config.globalProperties 方式
        // app.component('nmSkelect',nmSkelect)
        // app.component('nmSwipe',nmSwipe)
        // app.component('nmMore',nmMore)
        // app.component('nmBread',nmBread)
        // app.component('nmBreadItem',nmBreadItem)
        const importFn = require.context('./', false, /\.vue$/)
        importFn.keys().forEach(path => {
            const component = importFn(path).default
            const sp = path.split('.')[1]
            const componentName = sp.slice(1, sp.length)
            app.component(componentName, component)
        });
        defineDirective(app)
        app.config.globalProperties.$Confirm = Confirm
    }
}

const defineDirective = (app) => {
    // 图片懒加载指令 使用时 v-lazy
    // 原理 先存储图片地址 不能在src上 当图片进入可视区 将地址设置给图片
    app.directive('lazy', {
        // vue2.0 监听使用指令的Dom是否创建好 钩子函数 inserted
        // vue3.0 的指令拥有的钩子函数和组件的一样 mounted
        mounted(el, binding) { //binding 绑定的值
            //创建一个观察对象 来观察当前使用的指令元素
            const observe = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    observe.unobserve(el)
                    el.onerror = (err) => {
                        el.src = defaultImg
                    }
                    el.src = binding.value
                }
            }, {
                threshold: 0,
            })
            observe.observe(el)

        }
    })
}