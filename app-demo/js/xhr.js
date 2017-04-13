var tb = document.getElementById('tb')
/**
 * 从服务器端获取数据
 */
function getData() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.response)
            console.dir(res)  //拼接数据在页面上显示
            var arr = res.data
            arr.forEach(function(item,index) {
            tb.innerHTML += `<tr>
                                <td>${index+1}</td>
                                <td>${item.name}</td>
                                <td>${item.nickName}</td>
                                <td>${item.type}</td>                                
                                <td>${item.g}</td>
                                <td>${item.d}</td>                                
                            </tr>`
            });
        }
    }
    xhr.open('get', 'http://192.168.9.174:3000/api/v1/all')
    xhr.send()
}

getData()

var strname = document.getElementById('txtName')
var nickName = document.getElementById('txtNickName')
var type = document.getElementById('selType')
var g = document.getElementById('txtG')
var d = document.getElementById('txtD')
function doSub(e) {
    //post 提交
    // name姓名 nickName昵称 type类型 g攻击 d防御
    // 接口地址  http://192.168.10.12:3000/api/v1/sub
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(e){
        if(xhr.readyState == 4){
            getData()
        }
    }
    xhr.open('post','http://192.168.9.174:3000/api/v1/sub',true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`name=${strname.value}&nickName=${nickName.value}&type=${type.value.trim()}&g=${g.value}&d=${d.value}`)
}