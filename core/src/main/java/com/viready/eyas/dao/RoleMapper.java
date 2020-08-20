package com.viready.eyas.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.viready.eyas.model.role.Role;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 角色mapper
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:43
 */
@Repository
public interface RoleMapper extends BaseMapper<Role> {

    /**
     * 根据登录名获取角色
     * @param username 登录名
     * @return 角色list
     */
    List<Role> getRolesByUsername(String username);

    /**
     * 根据登录名获取权限字符串
     * @param username 登录名
     * @return 权限字符串list
     */
    List<String> getRolePermTokensByUsername(String username);

    List<Role> listPage(@Param("role") Role role);
}
