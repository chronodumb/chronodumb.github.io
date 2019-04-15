/**
* 
注使用此插件需根据实际完成基础配置
*
//player交互类  当父级用户状态发生变化后传递给当前页，被动式玩家登录状态， 主动式更新玩家数据,1(余额)，2(积分)
$p（{
    type:'player',
    data:1
}）
//api交互类     当前页需要在父级请求api时调用，主动式，第一参数为请求参数，第二参数为请求成功的回调，第三参数为请求失败的回调
如：$p({
        type:'api',
        data:{
            service:'player',
            functionName:'get',
        }
    },function(res){
        console.log(res)
    },function(err){
        console.log(err)
    })

//router交互类  当前页控制父级路由跳转，主动式，第一参数为跳转路由 
如：$p（{
    type:'router',
    data:'/home/login'
}）

//pop交互类     当前页控制父级弹窗，主动式，第一参数弹窗名称

如：$p（{
    type:'pop',
    data:'login'
}）
//special特殊类 当前页和父级页面特殊交互，当需求不属于以上四类时使用
*  
*
*hank 2018.12.7
*/

/*************************************************************基础配置*******************************************************/ 
//设置全局用户状态
var _player_='';
// 新开页面配置
var _platformId_=2;
var _wsUrl_='wss://www.xbet805.com/websocket/';
_wsUrl_= 'ws://192.168.10.199:9280';
_wsUrl_= 'ws://xbet-cstest.neweb.me/websocket';

//强制跳转网址
var _initReferrer_='https://www.xbet805.com';

/*************************************************************分割线*******************************************************/ 
setStore = function (key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
};
getStore = function (key) {
    return JSON.parse(sessionStorage.getItem(key));
};
//初始化
function getQuery(name,url){
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = url.split('?')[1].match(reg);
    if (r != null) return unescape(r[2]); return null;
}
if(location.search){
    var player = {
        playerId:getQuery('playerId',location.href),
        token:getQuery('token',location.href)
    }
    _player_=player;
    setStore('player',player);
}
var player=getStore('player');
if(player&& player.playerId){
    _player_=player;
}
function Socket(platformId,url){
    this.platformId=platformId;
    this.playerId="";
    this.url=url;
    this.ws=new WebSocket(url);
    this.count = 1;
    this.tryCount=0;
    this.heartBeat={
        valid:true,
        timer:''
    };
    this.callback={};
    var self=this;
    this.ws.onclose=function(){
        console.log(new Date()+':服务器连接关闭');
        self.heartBeat.timer && clearInterval(self.heartBeat.timer);
        if(self.tryCount<5){
            setTimeout(function(){
                self.tryCount++;
                self.ws=new WebSocket(url);
            },2000)
        }else{
            alert('链接意外关闭，请在网络稳定后刷新网页');
        }
    };
    this.ws.onopen=function(){
        console.log(new Date()+':服务器连接成功...');
        var player=getStore('player') || {};
        self.tryCount=0;
        // 心机包
        self.heartBeat.timer = setInterval(function(){
            self.heartBeat.valid=false;
            self.send({
                service:"player",
                functionName:'authenticate',
                data:{_silence:true,token:player.token,_heartBeat:true,_closeCONFIRM:true}
            })
            //在规定时间内服务器未响应 说明服务器链接失效，开始重新链接服务器
            setTimeout(function(){
                if(!self.heartBeat.valid){
                    clearInterval(self.heartBeat.timer);
                    self.ws=new WebSocket(self.url)
                }
            },20000)
        }, 30000);
        // 刷新时发现有效的玩家token，玩家有效性验证
        if(player&&player.playerId){
            player['requestId']=self.count;
            self.callback[self.count]={
                opt:{
                    service:'player',
                    functionName:'authenticate', 
                    data:player
                },
                fun:function(res){
                    self.playerId=player.playerId;
                    _player_=player;
                    setTimeout(function(){
                        for(var i in self.callback){
                            self.load(self.callback[i]);
                        }
                    },0);
                },
                err:function(res){
                    setTimeout(function(){
                        for(var i in self.callback){
                            self.load(self.callback[i]);
                        }
                    },0)
                }
            };
            self.load(self.callback[self.count]);
            self.count++;
        }else{
            for(var i in self.callback){
                self.load(self.callback[i]);
            }
        }
    }
}
Socket.prototype.send=function(opt,fun,err){
    let self = this;
    if(opt.type && opt.type=='api'){
        opt=opt.data;
    }
    if(this.playerId){
        opt['data']['playerId']=this.playerId;
    };
    opt['data']['requestId']=this.count;
    opt['data']['platformId']=this.platformId;
    this.callback[this.count]={
        opt:opt,
        fun:fun,
        err:err
    };
    if(this.ws.readyState ==1){
        this.load(this.callback[this.count])
    }else if(this.ws.readyState==3){
        this.ws=new WebSocket(this.url)
    };
    this.count++;
}
Socket.prototype.load=function(obj){
    if(!obj.opt.data._closeCONFIRM)$(".json_loading").fadeIn(100);
    this.ws.send(JSON.stringify(obj.opt));
    var self=this;
    this.ws.onmessage=function(res){
        var data = JSON.parse(res.data);
        var requestId=data.requestId;
        var status=data.data.status;
        //心机包
        self.heartBeat.valid=true;
        if(status==200){
            if(data.functionName=="login"){
                //如果是玩家登陆需要缓存一下玩家token和playerId，方便刷新时恢复；
                var player={token:data.data.token,platformId:8,playerId:data.data.data.playerId};
                _player_=player;
                setStore("player",player);
                self.playerId=data.data.data.playerId;
            }  
            if(data.functionName != 'notifyNewMail' &&self.callback[requestId].fun){
                self.callback[requestId].fun(data.data);
            }
        }
        else if(status==420){
            setStore("player",'');
            window.location.reload();
        }
        else if(status==475){
            $(".btn-application-award").trigger("click");
        }
        else{
            var errStr=data.data.errorMessage;
            if(data.functionName=="authenticate" && !self.callback[requestId].opt.data._heartBeat){
                setStore("player",'');
            }  
            if(self.callback[requestId] && self.callback[requestId].err){
                self.callback[requestId].err(data.data);
            }else{
                if(!self.callback[requestId].opt.data._closeCONFIRM)alert(errStr);
            }
        }
        delete self.callback[requestId];
        var isLoad=true;
        for(var i in self.callback){
            isLoad=false;
        }
        if(isLoad)$(".json_loading").fadeOut();
    }
}


//子页面和父页面五类功能性交互player，api，router，pop，special；
var _WS_,_referrer_=_initReferrer_,_POST_={},_index_=1;
if(window.self === window.top){
    //ws
    _WS_= new Socket(_platformId_,_wsUrl_);
}
function $p(data,fun,err){
    var type= data.type;
    //判断是新开还是内嵌页面
    if(window.self === window.top){
        if(type=='api' || !type){
            _WS_.send(type? data.data:data,fun,err);
        }else if(type=='game'){
            
            var myWin= window.open();
            _WS_.send({
                service:'game',
                functionName:'getLoginURL', 
                data:{
                    clientType:1,
                    clientDomainName:location.origin,
                    gameId:data.data
                }
            },function(res){
                myWin.location.href=res.data.gameURL;
                if(res.data.gameURL.includes('ptclient')){
                    setTimeout(()=>{
                        myWin.location.href = res.data.gameURL;
                    },4000)
                }
            },function(){
                myWin.close();
            });
        }else{
            var url=_referrer_;
            //判断用户是否已经登录，如果登录了加入token&playerId
            var player=getStore('player');
            if(player &&player.playerId)url=addUrl(url,"token="+player.token+"&playerId="+player.playerId);
            url=addUrl(url,type+"="+ JSON.stringify(data.data));
            window.open(url);
        }
    }else{
        //对api请求进行异步处理
        if(type == 'api' || !type){
            if(!data.type){
                data={
                    type:'api',
                    data:data
                }
            };
            data._index_=_index_;
            _POST_[_index_]={
                data:data,
                fun:fun,
                err:err
            };
            window.parent.postMessage(data,'*');
            _POST_[_index_].load=function(event) {
                if(event.data&&event.data._index_&& _POST_[event.data._index_]){
                    if(_POST_[event.data._index_].err&&event.data.err){
                        //  API处理错误
                        _POST_[event.data._index_].err(event.data.data);
                    }else if(_POST_[event.data._index_].fun){
                        //  API请求成功
                        _POST_[event.data._index_].fun(event.data.data);
                    }
                    window.removeEventListener("message",_POST_[event.data._index_].load,false);
                    //删除对象
                    delete _POST_[event.data._index_];
                }
            }
            window.addEventListener("message",_POST_[_index_].load, false);
            ++_index_;
        }else{
            window.parent.postMessage(data,'*');
        } 
    }
}
//添加URL参数判断是否是第一位；
function addUrl(url,str){
    if(url.indexOf("?")!= -1 ){
        url +='&' +str; 
    }else{
        url +='?' +str; 
    }
    return url;
}

//获取连接地址
function domainURI(str){  
    var durl=/http:\/\/([^\/]+)\//i;  
    if(str.indexOf("https")!= -1 ){
        durl=/https:\/\/([^\/]+)\//i; 
    }
    domain = str.match(durl); 
    return domain[0] || location.origin;  
} 
