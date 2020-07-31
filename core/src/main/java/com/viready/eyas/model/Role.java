package com.viready.eyas.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 角色model
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:39
 */
@Data
@TableName("sys_role")
public class Role {

    @TableId("role_id")
    private Integer roleId;

    @TableField("role_name")
    private String roleName;

    @TableField("description")
    private String description;
}
