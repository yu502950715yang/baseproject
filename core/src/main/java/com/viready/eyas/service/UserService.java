package com.viready.eyas.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.viready.eyas.model.User;

/**
 * 用户接口
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:21
 */
public interface UserService extends IService<User> {

    User getUserByToken(String token);

    /**
     * 根据登录名获取用户信息
     * @param username 登录名
     * @return 用户信息
     */
    User getUserByUsername(String username);

    void testAsync();
}
