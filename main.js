function tag(element,attributes){
    var ele=document.createElement(element)
    for(var key in attributes){
        ele[key]=attributes[key]
    }
    return ele
}

function createImage(domain){
    var img=document.createElement('img')
    if(domain){
        img.src='http://'+domain+'/favicon.ico'
    }else{
        img.src='images/favicon.ico'
    }
    img.onerror=function(e){
        e.target.src='images/favicon.ico'
    }
    return img
}

function init(){
    var keys={
        0:['q','w','e','r','t','y','u','i','o','p'],
        1:['a','s','d','f','g','h','j','k','l'],
        2:['z','x','c','v','b','n','m'],
        length:3
    }
    var hash={
        'q':'qq.com',
        'w':'weibo.com',
        'e':'ele.me',
        'r':'renren.com',
        't':'taobao.com',
        'y':'youku.com',
        'u':'uc.cn',
        'i':'iqiyi.com',
        'o':'opera.com',
        'p':undefined,
        'a':'alibaba.com',
        's':'sougou.com',
        'm':'mgtv.com'
    }
    var hashLocalStorage=JSON.parse(localStorage.getItem('save')||'null') 
    if(hashLocalStorage){
        hash=hashLocalStorage
    }
    return{
        "keys":keys,
        "hash":hash
    }
}

function generateKeyBoard(keys,hash){
    for(var i=0;i<keys.length;i++){
        var div1=tag('div',{className:'row'})
        cover.appendChild(div1)
        var row=keys[i]
        for(var j=0;j<row.length;j++){
            var oSpan=tag('span',{className:'text',textContent:row[j]})
            var btn=createButton(row[j])
            var img=createImage(hash[row[j]])
            var oKbd=tag('kbd',{className:'key'})
                oKbd.appendChild(oSpan)
                oKbd.appendChild(img)
                oKbd.appendChild(btn)
                div1.appendChild(oKbd)
        }
    }
}

function createButton(ids){
    var button=tag('button',{className:'E',textContent:'E',id:ids})
    button.onclick=function(b){
        var oBtn2=b.target
        var img2=oBtn2.previousSibling
        var keyE=oBtn2['id']
        var web=prompt('请给我个网址')
        hash[keyE]=web
        img2.src='http://'+web+'/favicon.ico'
        img2.onerror=function(xxx){
        xxx.target.src='images/favicon.ico'
    }
    localStorage.setItem('save',JSON.stringify(hash))
}
return button
}

function listenToUser(hash){
    document.onkeypress=function(a){
        var key= a['key']
        var website=hash[key]
    //    location.href="http://"+website
    window.open("http://"+website,"_blank")
    }
}

