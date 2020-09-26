export function send_get_request_to_api(url){
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.onload = function(){
            if (xhr.status == 200){
                resolve(JSON.parse(xhr.response))
            }
            else{
                reject(xhr.statusText)
            }
        }
        xhr.onerror = function(){
            reject(xhr.statusText)
        }
        xhr.send()
    })
}
