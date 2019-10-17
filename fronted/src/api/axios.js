import axios from 'axios'
import {
  Notification
} from 'element-ui'

export const instance = (url, data = {}) => new Promise((resolve, reject) => {
  axios({ url, ...data }).then(res => {
    if (res.data && res.data.success) {
      resolve(res.data)
    } else if (res.headers['content-type'] === 'application/zip') {
      const contentDisposition = res.headers['content-disposition']
      const filename = contentDisposition.split(';')
        .find(str => str.indexOf('filename') > -1)
        .split('=')[1]
        .replace(/"/g, '')
      const blob = new Blob([res.data], { type: res.headers['content-type'] })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(link.href)
      resolve(link)
    } else if (res.data && !res.data.success) {
      Notification.error(res.data.msg)
      reject(data)
    }
  }).catch(e => {
    if (e.response && e.response.data && e.response.data.msg) {
      Notification.error(e.response.data.msg)
    } else if (e.response && e.response.data) {
      Notification.error(e.response.data)
    } else {
      Notification.error(e.msg)
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
