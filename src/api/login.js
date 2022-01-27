import request from '@/utils/request'
/**
 * 
 * @param {用户名 密码} param0 
 * 
 */
export const userLogin = ({ account, password }) => {
    return request('/login', 'post', { account, password })
}
/**
 * 
 * @param {用户手机密码} mobile 
 * @returns 手机验证码
 */
export const userCode = (mobile) => {
    return request('/login/code', 'get', { mobile })
}
/**
 * 
 * @param {手机号，验证码} param0 
 * @returns 手机号登录
 */
export const userCodeLogin = ({ mobile, code }) => {
    return request('/login/code', 'post', { mobile, code })

}

export const userQQLogin = (unionId, source = 1) => {
    return request('/login/social', 'post', { unionId, source })
}
export const userBindCode = (mobile) => {
    return request('/login/social/code', 'get', { mobile })
}

/**
 * 
 * @param {绑定账号} param0 
 * @returns  
 */
export const userBindQQLogin = ({ mobile, unionId, code }) => {
    return request('/login/social/code', 'get', { mobile, unionId, code })
}

/**
 * 
 * @param {用户名} account 
 * @returns 用户名是否唯一
 */
export const checkUsername = (account) => {
    return request('/register/check', 'get', { account })
}

export const userQQPatchCode = (mobile) => {
    return request('/register/code', 'get', mobile)
}
/**
 * 
 * @param {qq标识id 手机号码 验证码 用户名 密码} param0
 * return 
 */
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
    return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}

