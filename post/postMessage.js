let self = '';

function CreatedPostMessage(url) {
    self = this;
    this.url = url;
    this.iframe = all.$(`<iframe id="myIframe" frameborder="0" src="${url}" width="100%" height="100%"></iframe>`);
    all.$('.box_discount_content').append(this.iframe);
}

let _proto = CreatedPostMessage.prototype;

_proto.send = function(msg) {
    let data = Object.assign({ pwd: 'eu' }, msg)
    this.iframe.get(0).contentWindow.postMessage(data, this.url);
}

let depositList = [];

window.addEventListener('message', function(e) {
    let type = e.data.type; 
    // if (e.data.pwd !== 'euMessage1') return;
    // 领取优惠
    if (type === 'apply') apply(e.data.data);
    // 埋点
    if (type === 'clickCount') clickCount(e.data);
    // 获取数据
    if (type === 'get') getData(e.data);
    // 路由跳转
    if (type === 'router') router(e.data.path);
    // 数据请求（2019/01/21新增）
    if (type === 'api') api(e.data);
    // 刷新数据（2019/01/21新增）
    if (type === 'refreshData') refreshData(e.data.data);
}, false);

/**
 * 领取优惠
 * @param {Object} result 
 */
function apply(result) {
    let data = {
        code: result.code,
        data: {}
    };
    // 如果需要发送存款记录
    if (result.deposit) {
        all.tool.send('getTopupList', {
            startIndex: 0,
            requestCount: 10
        }).then(result => {
            depositList = result.data.records;
            if (depositList.length === 0) {
                all.tool.TipWinShow('需有最新一笔存款才可申请，请马上存款即可领取！', [{ name: '取消' }, {
                    name: '去充值',
                    callback: () => {
                        all.router.push({
                            name: 'deposit',
                            params: {
                                code: data.code,
                                promoSend: true
                            }
                        });
                    }
                }]);
                return;
            }
            data.data.topUpRecordId = depositList[0]._id;
            applyRewardEvent(data);
        });
    } else {
        applyRewardEvent(data);
    }

}

/**
 * 埋点
 * @param {Object} data 
 */
function clickCount(data) {
    let sendData = {
        device: 'H5',
        pageName: data.page,
        buttonName: data.btn,
        hideLoading: true,
    };

    if (all.tool.isApp()) {
        sendData.registerClickApp = true
    } else {
        sendData.registerClickH5 = true
    }

    all.tool.send('clickCount', sendData)
}

/**
 * 获取数据
 * @param {Object} data 
 */
function getData(data) {
    let sendData = {
        functionName: data.functionName
    }
    all.tool.send(data.functionName, data.data).then(result => {
        self.send({
            type: 'get',
            data: Object.assign(sendData, result)
        });
    });
}

/**
 * 跳转路由
 * @param {String} path 
 */
function router(path) {
    let pathObj = {};
    if (path === 'game') {
        pathObj = {
            path: '/game',
            query: {
                page: 11,
            }
        }
    } else {
        pathObj = path;
    }
    all.router.push(pathObj);
}

/**
 * 领取优惠
 * @param {Object} data 
 */
function applyRewardEvent(data) {
    all.tool.send('applyRewardEvent', data).then(applyResult => {
        all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！', [{name: '取消'}, {
            name: '前往游戏',
            callback: () => {
                if (data.code.indexOf('KXQP') !== -1) {
                    all.router.push('gameLobbyKY');
                } else {
                    all.router.push({
                        path: '/game',
                        query: {
                            page: 11
                        }
                    });
                }
            }
        }]);
    }).catch(err => {
        if (err.status === 423) {

            let messageTip = err.errorMessage;

            let gotoWhere = {
                name: '去充值',
                callback: () => {
                    all.router.push({
                        name: 'deposit',
                        params: {
                            code: data.code,
                            promoSend: true
                        }
                    });
                }
            }

            if (err.errorMessage === '无法找到此存款记录，详情请联系客服') messageTip = '需有最新一笔存款才可申请，请马上存款即可领取！';

            if (err.errorMessage === '该充值记录已被使用') messageTip = '需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';

            if (err.errorMessage === '此电话已经达到了该优惠周期内的申请上限') messageTip = '一个电话仅限领取一次';

            if (err.errorMessage === "投注额不足")
                gotoWhere = {
                    name: '前往游戏',
                    callback: () => {
                        all.router.push({
                            path: '/game',
                            query: {
                                page: 11
                            }
                        });
                    }
                }

            all.tool.TipWinShow(messageTip, [{ name: '取消' }, gotoWhere]);

        } else {
            all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]);
        }
    });
}

/**
 * 请求API
 * @param {Object} data 
 */
function api(data) {
    all.tool.send(data.data.functionName, data.data.data).then(result => {
        self.send({
            type: 'api',
            data: result,
            _index_: data._index_,
        });
    }).catch(err => {
        self.send({
            type: 'api',
            data: err,
            _index_: data._index_,
            err: true
        });
    });
}

/**
 * 刷新数据
 * @param {Number} data 1 余额  2积分
 */
function refreshData(data) {
    if (data == 1) {
        all.store.dispatch('setUserBalance');
    } else if (data == 2) {
        all.store.dispatch('setUserPoint');
    }
}

export default CreatedPostMessage;