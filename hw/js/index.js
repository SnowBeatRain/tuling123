var txt = document.getElementById('txt')
var app = document.getElementById('app')

// 输入框键盘事件
function keyupHandle(e){
    if(e.keyCode == 13){
        sendMsg(txt.value)
    }
}
/**
 * 
 * @param {*向图灵123的api接口发送消息} msg 
 */
function sendMsg(msg){
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState ==4){
            // app.innerHTML +=xhr.response + `<hr>`
            var res = JSON.parse(xhr.response)
            var strHtml =''
            if(res.code == 100000){
                strHtml = `我：${txt.value}<br>回答：${res.text}<hr>`
            }
            else if(res.code == 200000){
                strHtml = `提问：${txt.value}<br>回答：<a target ="_blank" href="${res.url}">已找到</a>`
            }
            else{
                strHtml = `提问：${txt.value}<br>回答：我暂时无法回答你的问题`
            }
            // app.innerHTML +='我：'+txt.value+'<br>'+`机器人：<span>${t.text}</span>`+`<hr>`
            txt.value= ''     
            app.innerHTML += strHtml       
        }
    }
    xhr.open('get','http://www.tuling123.com/openapi/api?key=c22226f2aeff4843a40b65772112a91b&info='+txt.value)
    xhr.send()
}