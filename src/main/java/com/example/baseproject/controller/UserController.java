package com.example.baseproject.controller;

import com.example.baseproject.entity.User;
import com.example.baseproject.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 用户管理controller
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:23
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<User> getAll() {
        return userService.list();
    }

    @GetMapping("/getByToken/{token}")
    public User getByToken(@PathVariable String token) {
        logger.info("----------根据token获取用户信息-----------");
        return userService.getUserByToken(token);
    }
}
