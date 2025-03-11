/**
 * 发送验证码到邮箱
 */
function sendVerifyCode(){
    // 1、获取账号邮箱
    var account = document.getElementById("account-id").value;
    if (!isEmail(account)) {
        alert("请输入有效的电子邮箱地址");
        return;
    }

    sendVerifyCodeProxy(account);
    alert("验证码已发送到账号邮箱");
}

/**
 * 登录系统
 */
function login() {
    var account = document.getElementById("account-id").value;
    var verifyCode = document.getElementById("verify-code-id").value;

    // 登录系统获取token
    const userLogin = {"account":account, 
        verifyCode: verifyCode};

    loginProxy(userLogin, handleToken);
}

/**
 * 处理登录返回的token
 * 
 * @param {接口返回结果} result 
 */
function handleToken(result){
    if (result.errorCode != "OPERATE_SUCCESS") {
        alert("登录失败");
        return;
    }
    
    // 保存到本地
    var token = result.data;
    localStorage.setItem("jwt-token", token);

    // 跳转到主页面
    window.location.href = "./index.html";
}

/**
 * 注销
 */
function logout(){
    localStorage.removeItem("jwt-token");
    window.location.href = "./login.html";
}