import axios from 'axios'
import {
  Notification
} from 'element-ui'

export const instance = (url, data = {}) => new Promise((resolve, reject) => {
  axios({ url, ...data }).then(res => {
    if (res.data && res.data.success) {
      resolve(res.data)
    } else if (data.responseType === 'blob') {
      const contentDisposition = res.headers['content-disposition']
      const filename = contentDisposition.split(';')
        .find(str => str.indexOf('filename') > -1)
        .split('=')[1]
        .replace(/"/g, '')
      const blob = new Blob([res.data])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(link.href)
      resolve(link)
    } else if (res.data && !res.data.success) {
      Notification.error(res.data.stack)
      reject(data)
    }
  }).catch(e => {
    if (e.response && e.response.data && e.response.data.stack) {
      Notification.error(e.response.data.stack)
    } else if (e.response && e.response.data) {
      Notification.error(e.response.data)
    } else {
      Notification.error(e.stack)
      console.error(e.stack)
    }
    reject(e)
  })
})

instance.get = (url, data = {}) => instance(url, { method: 'get', ...data })
instance.post = (url, data = {}) => instance(url, { method: 'post', ...data })
instance.put = (url, data = {}) => instance(url, { method: 'put', ...data })
instance.delete = (url, data = {}) => instance(url, { method: 'delete', ...data })

export default instance
