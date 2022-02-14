const request = new XMLHttpRequest()
console.log('测试跨域')
request.open('GET', 'http://qqtest.com:999/friends.json')
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200){
    console.log(request.response)
  }
}
request.send()

console.log('测试CROS')
request.open('GET', 'http://qqtest.com:999/allow-all.json')
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200){
    console.log(request.response)
  }
}
request.send()

console.log('测试JSONP')
function  jsonp(url){
  return new Promise((resolve, reject) => {
    const random = 'AAAOHFUCKTHEMALLAAA' + Math.random()
    window[random] = (data) => {
      resolve(data)
    }
    script = document.createElement('script')
    script.src = `${url}?callback=${random}`
    script.onload = () => {
      script.remove()
    }
    script.onerror = () => {
      reject()
    }
    document.body.append(script)
  })
}
jsonp('http://qqtest.com:999/friends.js')
  .then((data) => {
    console.log(data)
  })



