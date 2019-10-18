package com.example.baseproject.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.baseproject.entity.User;
import com.example.baseproject.mapper.UserMapper;
import com.example.baseproject.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * 用户接口实现
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:22
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    @Cacheable(value = "user", key = "#token")
    public User getUserByToken(String token) {
        User user = new User();
        user.setToken(token);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(user);
        User user1 = getOne(queryWrapper);
        logger.info("从数据库中读取，而非从内存中读取！");
        return user1;
    }
}
