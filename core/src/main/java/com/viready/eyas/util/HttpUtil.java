package com.viready.eyas.util;

import com.viready.eyas.model.User;
import org.apache.shiro.SecurityUtils;

/**
 * http工具类
 */
public final class HttpUtil {
    private static final String USER_KEY = "user";

    private HttpUtil() {

    }

    /**
     * 设置用户到session
     *
     * @param user 用户
     */
    public static void saveUserToSession(User user) {
        SecurityUtils.getSubject().getSession().setAttribute(USER_KEY, user);
    }

    /**
     * 从Session获取当前用户信息
     *
     * @return user
     */
    public static User getCurrentUser() {
        Object attribute = SecurityUtils.getSubject().getSession().getAttribute(USER_KEY);
        if (attribute == null) {
            throw new NullPointerException("从session中获取用户信息异常");
        }
        return (User) attribute;
    }

}
