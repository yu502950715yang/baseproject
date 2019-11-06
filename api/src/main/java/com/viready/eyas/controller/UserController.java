package com.viready.eyas.controller;

import com.viready.eyas.entity.User;
import com.viready.eyas.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@Api(tags = "用户管理")
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "获取全部用户")
    @ApiImplicitParam(name = "token", required = true, paramType = "header")
    @GetMapping("/getAll")
    public List<User> getAll() {
        return userService.list();
    }

    @ApiOperation(value = "根据token获取用户信息", notes = "必传参数：token")
    @GetMapping("/getByToken/{token}")
    public User getByToken(@PathVariable String token) {
        logger.info("----------根据token获取用户信息-----------");
        return userService.getUserByToken(token);
    }
}
