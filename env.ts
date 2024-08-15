let BASE_URL: string;

if (process.env.NODE_ENV === 'development') {
    // BASE_URL = "http://192.168.2.217:18888/api/v3/"; // 本地开发环境
    BASE_URL = "http://112.124.6.127:8088/api/v3/"; // 测试
    // BASE_URL = "https://aics.madaogo.com/api/v3/"; // 本地开发环境
} else {
    BASE_URL = "https://aics.madaogo.com/api/v3/"; // 线上生产环境
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 123) {
            event.preventDefault();
        }
        if (event.ctrlKey && (event.keyCode === 73 || event.keyCode === 119)) {
            event.preventDefault();
        }
    });
    (() => {
        function block() {
            if (
                window.outerHeight - window.innerHeight > 200 ||
                window.outerWidth - window.innerWidth > 200
            ) {
                document.body.innerHTML = "检测到非法调试,请关闭后刷新重试!";
            }
            setInterval(() => {
                (function () {
                    return false;
                })
                ["constructor"]("debugger")
                ["call"]();
            }, 50);
        }
        try {
            block();
        } catch (err) { }
    })();
}
export { BASE_URL };
