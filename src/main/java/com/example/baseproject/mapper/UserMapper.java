package com.example.baseproject.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.baseproject.entity.User;

/**
 * 用户mapper
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:20
 */
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据token获取用户信息
     *
     * @param token 用户token
     * @return 用户信息
     */
    User getUserByToken(String token);
}
