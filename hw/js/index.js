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
            var t = JSON.parse(xhr.response)
            app.innerHTML +='我：'+txt.value+'<br>'+`机器人：<span>${t.text}</span>`+`<hr>`
            txt.value= ''            
        }
    }
    xhr.open('get','http://www.tuling123.com/openapi/api?key=c22226f2aeff4843a40b65772112a91b&info='+txt.value)
    xhr.send()
}