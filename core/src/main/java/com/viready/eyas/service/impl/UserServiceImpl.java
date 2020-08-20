package com.viready.eyas.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.viready.eyas.mapper.UserMapper;
import com.viready.eyas.model.User;
import com.viready.eyas.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

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

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    @Cacheable(value = "user", key = "#token")
    public User getUserByToken(String token) {
        User user = new User();
//        user.setToken(token);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(user);
        User user1 = getOne(queryWrapper);
        logger.info("从数据库中读取，而非从内存中读取！");
        return user1;
    }

    @Override
    public User getUserByUsername(String username) {
        User queryUser = new User();
        queryUser.setUsername(username);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(queryUser);
        return getOne(queryWrapper);
    }

    @Override
    @Async()
    public void testAsync() {
        List<User> userList = list();
        userList.forEach(user -> logger.info(user.getUsername()));
    }
}
