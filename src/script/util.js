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

/**
 * 将UTC格式时间转换为本地时间
 * 
 * @param {utc格式时间} utc 
 */
function transformUTC2LocalTime(utc) {
    if (utc != null) {
        var date = new Date(utc);
        return date.toLocaleString();
    } else {
        return '';
    }
}
