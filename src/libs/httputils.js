/**
 * 请求头
 */
let header = {
  'Content-Type': 'application/json',
  device_token: 'ebc9f523e570ef14'
}
let baseUrl = 'https://zhaoyj.work'

export function postRequest(url, params) {
  // console.log('请求方式：', 'POST')
  return request(url, params, 'POST')
}

export function getRequest(url, params) {
  // console.log('请求方式：', 'GET')
  return request(url, params, 'GET')
}

function dealParams(params) {
  // console.log('请求参数:', params)
  return params
}

function request(url, params, method) {
  // console.log('请求url：' + url)
  wx.showLoading({
    title: '加载中...'
  })
  // console.log('请求头：', header)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/${url}`,
      data: dealParams(params),
      method: method,
      header: header,
      success: function(res) {
        wx.hideLoading()
        // console.log('响应：', res.data)
        resolve(res.data)
      },
      fail: function(error) {
        reject(error) //failure for other reasons
      }
    })
  })
}

// module.exports = {
//   postRequest: post,
//   getRequest: get
// }

