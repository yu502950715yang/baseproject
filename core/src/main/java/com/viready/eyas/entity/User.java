package com.viready.eyas.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 用户model
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 11:56
 */
@Data
@TableName("user")
public class User {

    @TableId("id")
    private Integer id;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("phone")
    private String phone;

    @TableField("token")
    private String token;

}
