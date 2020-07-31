package com.viready.eyas.common.response;

/**
 * response状态码
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-11-06 14:09
 */
public enum ReturnCode {
    /**
     * 成功
     */
    OK(200),
    /**
     * 后台服务错误
     */
    ERROR(500),
    /**
     * 验证错误，数据不合法
     */
    BAD_REQUEST(400),
    /**
     * 目标信息不存在
     */
    NOT_FOUND(404),
    /**
     * token失效
     */
    TOKEN_ERROR(50008);

    private int code;

    ReturnCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}