// 提供复用逻辑的函数的钩子
import { useIntervalFn } from "@vueuse/core";
import dayjs from "dayjs";
import { ref, onUnmounted } from "vue";
/**
 * 
 * @param {Object} target dom对象     
 * @param {Function} apiFn  api回调函数 
    懒加载函数
*/
import { useIntersectionObserver } from '@vueuse/core'
export const useLazyData = (target, apiFn) => {
    const res = ref([])
    const { stop } = useIntersectionObserver(
        // 监听的目标元素
        target,
        ([{ isIntersecting }], observerElement) => {
            //intersecting 是否进入可视区
            if (isIntersecting) {
                stop()
                apiFn().then(data => {

                    res.value = data.result

                })
            }
        }, {
        threshold: 0.1
    }
    )
    return res
}
// export const tryRef = () => {
//     const rf = ref(0)
//     setInterval(() => {
//         console.log(rf.value)
//     }, 1000)
//     setTimeout(() => {
//         rf.value = 1
//     }, 5000)
//     return { rf }

// }
export const usePayTime = (times) => {
    const time = ref(times);
    console.log(times)
    const timeText = ref(0);
    const { pause, resume } = useIntervalFn(
        () => {
            time.value--;
            timeText.value = dayjs.unix(time.value).format("mm分ss秒");
        },
        1000,
        false
    );
    onUnmounted(() => {
        pause();
    });
    return { pause, resume, timeText }

}