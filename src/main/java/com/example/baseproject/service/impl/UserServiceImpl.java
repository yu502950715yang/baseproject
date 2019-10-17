package com.example.baseproject.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.baseproject.mapper.UserMapper;
import com.example.baseproject.entity.User;
import com.example.baseproject.service.UserService;
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
}
