package com.viready.eyas.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.github.pagehelper.PageInfo;
import com.viready.eyas.common.page.Page;
import com.viready.eyas.model.Role;

import java.util.List;

/**
 * 角色接口
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:48
 */
public interface RoleService extends IService<Role> {

    /**
     * 根据登录名获取角色
     * @param username 登录名
     * @return 角色list
     */
    List<Role> getRolesByUsername(String username);

    /**
     * 根据登录名获取权限字符串
     * @param username 登录名
     * @return 权限字符串
     */
    List<String> getRolePermTokensByUsername(String username);

    PageInfo<Role> listPage(Role role, Page page);
}
