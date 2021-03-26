//处理安卓返回键
var AndroidBack = {
	//关闭
	close: function(id) {
		plus.key.addEventListener('backbutton', function() {
			Webview.close({
				id: id
			})
		})
	},
	//隐藏
	hide: function(id) {
		plus.key.addEventListener('backbutton', function() {
			Webview.hide({
				id: id
			})
		})
	},
	//退出
	out: function() {
		plus.key.addEventListener('backbutton', function() {
			outApp();
		})
	}
}
//通用页面的顶部返回与安卓返回处理
function publicBack() {
	mui.back = function() {};
	var cwId = plus.webview.currentWebview().id;
	AndroidBack.close(cwId);

	document.getElementsByClassName('common-header-leftA')[0].addEventListener('click', function() {
		Webview.close({
			id: cwId
		});
	}, false)
}

//通用页面跳转
function publicWebviewShow(paramObj) {
	var webviewPublicShowRealParam = cloneObj(webviewParam.webviewPublicShowObj);
	for(var i in webviewPublicShowRealParam) {
		for(var j in paramObj) {
			if(i === j) {
				webviewPublicShowRealParam[i] = paramObj[j];
			}
		}
	}
	var id = webviewPublicShowRealParam.id;
	if(plus.webview.getWebviewById(id) === null) { //跳转的页面为空,则先创建
		Webview.create({
			id: id,
			extras: webviewPublicShowRealParam.extras
		})

		plus.webview.getWebviewById(id).addEventListener('loaded', function() {
			Webview.show({
				id: id,
				showedCB: webviewPublicShowRealParam.showedCB
			})
		})
	} else {
		Webview.show({
			id: id,
			showedCB: webviewPublicShowRealParam.showedCB
		})
	}
}
//操作表
function selectUseActionsheet(arr, title, succ) {
	var buttonArr = [];

	for(var i = 0; i < arr.length; i++) {
		var obj = {
			title: arr[i]
		}
		buttonArr.push(obj);
	}

	plus.nativeUI.actionSheet({
		title: title,
		cancel: "取消",
		buttons: buttonArr
	}, function(e) {
		var i = e.index;
		if(i > 0) {
			succ(i);
		}
	});
}

//选择相册图片或拍照图片(单张)
function selectImg(succ) {
	selectUseActionsheet(['从相册中选择', '拍照'], '选择图片', function(i) {
		if(i == 1) {
			plus.gallery.pick(function(path) {
				succ(path);
			}, function() {
				plus.nativeUI.toast('取消选择图片');
			}, {
				filter: 'image'
			});
		}
		if(i == 2) {
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(path) {
				succ(plus.io.convertLocalFileSystemURL(path));
			}, function() {
				plus.nativeUI.toast('取消选择图片');
			});
		}
	});
}

//选择相册图片或拍照图片(多张)
function selectImgs(succ) {
	selectUseActionsheet(['从相册中选择', '拍照'], '选择图片', function(i) {
		if(i == 1) {
			plus.gallery.pick(function(path) {
				succ(path);
			}, function() {
				plus.nativeUI.toast('取消选择图片');
			}, {
				filter: 'image',
				multiple: true
			});
		}
		if(i == 2) {
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(path) {
				succ(plus.io.convertLocalFileSystemURL(path));
			}, function() {
				plus.nativeUI.toast('取消选择图片');
			});
		}
	});
}

//沉浸式状态栏
function publicStatusbar() {
	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) { // 当前环境为沉浸式状态栏模式
		immersed = parseFloat(ms[2]); // 获取状态栏的高度
	}
	if(document.querySelector('.common-header-content')!==null){
		document.querySelector('.common-header-content').style.paddingTop = immersed + 'px';
	}
	
	if(document.querySelector('.common-content')!==null){
		document.querySelector('.common-content').style.marginTop = immersed + 'px';
	}
	
	return immersed;
}

//保存图片
function saveImage(path) {
	plus.device.vibrate(500);
	if(confirm('保存图片')) {
		var dtask = plus.downloader.createDownload(path, {}, function(d, status) {
			if(status == 200) {
				plus.gallery.save(d.filename, function() {
					plus.nativeUI.toast('保存图片成功' + d.filename);
				});
			} else {
				plus.nativeUI.toast('保存图片失败');
			}
		});
		dtask.start();
	}
}

//直接保存
function saveImageNow(path) {
	var dtask = plus.downloader.createDownload(path, {}, function(d, status) {
		if(status == 200) {
			plus.gallery.save(d.filename, function() {
				plus.nativeUI.toast('保存图片成功' + d.filename);
			});
		} else {
			plus.nativeUI.toast('保存图片失败');
		}
	});
	dtask.start();
}

//分享
function share(shareType, content, href, thumbs, scene) {
	plus.share.getServices(function(s) {
		if(s.length > 0) {
			for(var i = 0; i < s.length; i++) {
				if(s[i].id == shareType) {
					if(!s[i].authenticated) {
						s[i].authorize(function(e) {
							if(shareType == 'sinaweibo') {
								shareSendSina(e);
							} else {
								shareSend(e);
							}
						}, function(e) {
							plus.nativeUI.toast('分享认证失败');
						})
					} else {
						if(shareType == 'sinaweibo') {
							shareSendSina(s[i]);
						} else {
							shareSend(s[i]);
						}
					}
				}
			}
		}
	}, function(e) {
		plus.nativeUI.toast('获取分享服务列表失败');
	});

	//发送分享
	function shareSend(e) {
		e.send({
			title: '来自缘圈的分享',
			thumbs: thumbs,
			content: content,
			href: href,
			extra: {
				scene: scene
			}
		}, function() {
			plus.nativeUI.toast('分享成功');
			$(".commonCoverDiv").css('display', 'none');
			$(".commonShareBottom").css('display', 'none');
		}, function(e) {
			plus.nativeUI.toast('分享失败');
		});
	}

	//发送分享（新浪微博是例外）
	function shareSendSina(e) {
		e.send({
			title: '来自缘圈的分享',
			content: content + href
		}, function() {
			plus.nativeUI.toast('分享成功');
		}, function(e) {
			plus.nativeUI.toast('分享失败');
		});
	}
}

//安卓退出
function outApp() {
	if(!firstTapTime) {
		firstTapTime = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			firstTapTime = null;
		}, 2000);
	} else {
		if(new Date().getTime() - firstTapTime < 2000) {
			plus.runtime.quit();
		}
	}
}

//图片截取中间部分显示
function showImgCenter(container, img) {
	var image = new Image();
	image.src = img.src;
	image.onload = function() {
		var cW = container.offsetWidth;
		var cH = container.offsetHeight;
		var cRate = cW / cH;
		var iW = image.naturalWidth;
		var iH = image.naturalHeight;
		var iRate = iW / iH;

		if(cRate < iRate) {
			img.style.width = 'auto';
			img.style.height = cH + 'px';

			var iW2 = img.offsetWidth;
			img.style.marginLeft = -(iW2 - cW) / 2 + 'px';
		} else if(cRate > iRate) {
			img.style.height = 'auto';
			img.style.width = cW + 'px';
			var iH2 = img.offsetHeight;
			img.style.marginTop = -(iH2 - cH) / 2 + 'px';
		} else {
			img.style.width = cW + 'px';
			img.style.height = cH + 'px';
		}
	}
}

//定位
function getLocation() {
	plus.geolocation.getCurrentPosition(function(e) {
		console.log(JSON.stringify(e));
		plus.storage.setItem('location', JSON.stringify(e));
	}, function() {
		plus.nativeUI.toast('获取位置失败');
	})
}

//跳转到用户详情
function publicToUser() {
	publicWebviewShow({
		id: "/doc/user/userDetail.html"
	})
}

//跳转到聊天
function publicToChat() {
	publicWebviewShow({
		id: "/doc/message/chat.html"
	})
}