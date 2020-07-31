package com.viready.eyas.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 用户model
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 11:56
 */
@Data
@ApiModel("用户model")
@TableName("sys_user")
public class User {

    @TableId("user_id")
    private Integer userId;

    @ApiModelProperty("用户名")
    @TableField("username")
    private String username;

    @ApiModelProperty("昵称")
    @TableField("nickname")
    private String nickname;

    @ApiModelProperty("密码")
    @TableField("password")
    private String password;

    @ApiModelProperty("邮箱")
    @TableField("email_address")
    private String emailAddress;

    @ApiModelProperty("电话")
    @TableField("phone")
    private String phone;
}
