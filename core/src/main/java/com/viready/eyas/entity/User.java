package com.viready.eyas.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户model
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 11:56
 */
@Data
@ApiModel("用户model")
@TableName("user")
public class User {

    @TableId("id")
    private Integer id;

    @ApiModelProperty("用户名")
    @TableField("username")
    private String username;

    @ApiModelProperty("密码")
    @TableField("password")
    private String password;

    @ApiModelProperty("电话")
    @TableField("phone")
    private String phone;

    @ApiModelProperty("token")
    @TableField("token")
    private String token;

    @ApiModelProperty("注册时间")
    @TableField("registration_time")
    private LocalDateTime registrationTime;
}
