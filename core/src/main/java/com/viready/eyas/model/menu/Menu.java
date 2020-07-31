package com.viready.eyas.model.menu;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 菜单model
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-30 15:09
 */
@Data
@TableName("sys_menu")
public class Menu {

    @TableId("menu_id")
    private String menuId;

    @TableField("menu_name")
    private String menuName;

    @TableField("icon")
    private String icon;

    @TableField("url")
    private String url;

    @TableField("perm_token")
    private String permToken;

    @TableField("parent_id")
    private String parentId;

    @TableField("level")
    private String level;

    @TableField("leaf")
    private boolean leaf;

    @TableField("sort_id")
    private double sortId;

    @TableField("memo")
    private String memo;

    @TableField("status")
    private Integer status;
}
