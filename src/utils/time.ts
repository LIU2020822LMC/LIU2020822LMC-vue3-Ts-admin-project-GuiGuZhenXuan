// 获取一天之中小时的时间函数
import { ref } from 'vue'

const getDateTime = () => {
  // 返回的信息
  const message = ref('')

  const hour = new Date().getHours()
  if (hour <= 9) {
    message.value = '早上好'
  } else if (hour <= 12) {
    message.value = '上午好'
  } else if (hour <= 18) {
    message.value = '下午好'
  } else {
    message.value = '晚上好'
  }

  return message.value
}

export default getDateTime
