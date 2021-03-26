//webview参数对象
var webviewParam = {
    //Webview窗口对象的样式(详细参数查看5+的WebviewStyles对象)
    webviewStyle: {
        additionalHttpHeaders: null, //窗口加载页面时额外添加的HTTP请求头数据
        animationOptimization: 'auto', //窗口动画优化方式
        cachemode: 'default', //窗口的缓存模式
        backButtonAutoControl: 'none', //Webview窗口自动处理返回键逻辑
        background: '#fff', //窗口的背景颜色
        blockNetworkImage: false, //是否阻塞网络图片的加载
        bottom: '0px', //窗口垂直向上的偏移量
        bounce: 'none', //窗口遇到边框是否有反弹效果
        bounceBackground: '#000', //窗口回弹效果区域的背景
        decelerationRate: 0.989, //窗口内容停止滑动的减速度
        dock: 'bottom', //窗口的停靠方式
        errorPage: 'none', //窗口加载错误时跳转的页面地址
        replacewebapi: null, //替换H5标准API
        hardwareAccelerated: true, //窗口是否开启硬件加速
        height: null, //窗口的高度
        kernel: 'UIWebview', //窗口使用的内核
        left: '0px', //窗口水平向右的偏移量
        margin: '', //窗口的边距
        mask: 'none', //窗口的遮罩,
        opacity: 1, //窗口的不透明度
        plusrequire: 'normal', //控制Webview注入5+ API时机
        popGesture: 'none', //窗口的侧滑返回功能
        render: 'onscreen', //窗口渲染模式
        right: '0px', //窗口水平向左的偏移量
        scalable: false, //窗口是否可缩放
        scrollIndicator: 'none', //窗口是否显示滚动条
        scrollsToTop: true, //点击设备的状态栏时是否滚动返回至顶部
        shareable: true, //是否可分享窗口加载的链接地址
        softinputMode: 'adjustPan', //弹出系统软键盘模式
//         statusbar: null, //窗口状态栏样式
        subNViews: null, //定义窗口的原生子View控件
        titleNView: null, //定义窗口的标题栏控件样式
        top: '0px', //窗口垂直向下的偏移量
        transition: null, //窗口定义窗口变换的动画效果
        transform: null, //窗口定义窗口变形效果
        position: 'absolute', //Webview窗口的排版位置
        userSelect: true, //用户是否可选择内容
        videoFullscreen: 'auto', //视频全屏播放时的显示方向
        width: '100%', //窗口的宽度
        zindex: 30, //窗口的堆叠顺序值
    },

    //创建窗口参数
    webviewCreateObj: {
        url: '',
        id: '',
        styles: null,
        extras: null
    },
    //关闭/隐藏窗口参数
    webviewCloseObj: {
        id: '',
        aniClose: 'slide-out-right',
        duration: '200',
        extras: null
    },
    //显示窗口参数
    webviewShowObj: {
        id: '',
        aniShow: 'slide-in-right',
        duration: '200',
        showedCB: null,
        extras: null
    },
    //打开窗口参数（包含create和open）
    webviewPublicShowObj: {
        id: '',
        extras: null,
        showedCB: null
    },
}