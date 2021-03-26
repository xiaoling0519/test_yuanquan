//窗口管理
var Webview = {
    //创建webview但不显示
    create: function (paramObj) {
        if (plus.webview.getWebviewById(paramObj.id) === null) { //重复的则不创建
            paramObj.url = paramObj.id; //url一般设为跟id一样

            webviewParam.webviewCreateObj.styles = cloneObj(webviewParam.webviewStyle);
			var webviewCreateRealParam=cloneObj(webviewParam.webviewCreateObj);
            if (!paramObj.hasOwnProperty('styles')) {
                webviewCreateRealParam.styles = cloneObj(webviewParam.webviewStyle);
            }
            for (var i in webviewCreateRealParam) {
                for (var j in paramObj) {
                    if (i === j) { //如果两个对象的键一样，则传入的覆盖模板的
                        if (i !== 'styles') {
                            webviewCreateRealParam[i] = paramObj[j];
                        } else {
                            for (var k in webviewCreateRealParam.styles) {
                                for (var x in paramObj.styles) {
                                    if (k === x) {
                                        webviewCreateRealParam.styles[k] = paramObj.styles[x];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            plus.webview.create(webviewCreateRealParam.url, webviewCreateRealParam.id, webviewCreateRealParam.styles,
                webviewCreateRealParam.extras);
        }
    },
    //将指定id的webview显示
    show: function (paramObj) {
        if (plus.webview.getWebviewById(paramObj.id) !== null) {
            var webviewShowRealParam = cloneObj(webviewParam.webviewShowObj);

            for (var i in webviewShowRealParam) {
                for (var j in paramObj) {
                    if (i === j) {
                        webviewShowRealParam[i] = paramObj[j];
                    }
                }
            }
            plus.webview.show(webviewShowRealParam.id,
                webviewShowRealParam.aniShow, webviewShowRealParam.duration, webviewShowRealParam.showedCB,
                webviewShowRealParam.extras);
        }
    },
    //隐藏指定id的webview
    hide: function (paramObj) {
        if (plus.webview.getWebviewById(paramObj.id) !== null) {
            var webviewCloseRealParam = cloneObj(webviewParam.webviewCloseObj);

            for (var i in webviewCloseRealParam) {
                for (var j in paramObj) {
                    if (i === j) {
                        webviewCloseRealParam[i] = paramObj[j];
                    }
                }
            }
            plus.webview.hide(webviewCloseRealParam.id, webviewCloseRealParam.aniClose, webviewCloseRealParam.duration,
                webviewCloseRealParam.extras);
        }
    },
    //关闭指定id的webview
    close: function (paramObj) {
        if (plus.webview.getWebviewById(paramObj.id) !== null) {
            var webviewCloseRealParam = cloneObj(webviewParam.webviewCloseObj);

            for (var i in webviewCloseRealParam) {
                for (var j in paramObj) {
                    if (i === j) {
                        webviewCloseRealParam[i] = paramObj[j];
                    }
                }
            }
            plus.webview.close(webviewCloseRealParam.id, webviewCloseRealParam.aniClose, webviewCloseRealParam.duration,
                webviewCloseRealParam.extras);
        }
    },
}