package com.viready.eyas.common.response;


/**
 * Ajax返回值
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-11-06 13:55
 */
public class AjaxResponse<T> {

    /**
     * 状态码
     */
    private int code;

    /**
     * 错误信息
     */
    private String msg;

    /**
     * 返回数据
     */
    private T returnData;

    public AjaxResponse() {
        this(ReturnCode.OK, "");
    }

    public AjaxResponse(ReturnCode code, String... msg) {
        this.code = code.getCode();
        this.msg = (msg == null || msg.length == 0) ? "" : msg[0];
    }

    public AjaxResponse(T returnData) {
        this();
        this.returnData = returnData;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getReturnData() {
        return returnData;
    }

    public void setReturnData(T returnData) {
        this.returnData = returnData;
    }
}
