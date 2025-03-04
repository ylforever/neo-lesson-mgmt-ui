/**
 * 判断字符串是否为email格式
 * 
 * @param {email地址} str 
 * @returns 判断结果
 */
function isEmail(str) {  
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
    return pattern.test(str);  
}  
