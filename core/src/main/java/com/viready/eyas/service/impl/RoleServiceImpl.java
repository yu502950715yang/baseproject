package com.viready.eyas.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.viready.eyas.dao.RoleMapper;
import com.viready.eyas.model.Role;
import com.viready.eyas.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 角色接口实现类
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:50
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public List<Role> getRolesByUsername(String username) {
        return roleMapper.getRolesByUsername(username);
    }

    @Override
    public List<String> getRolePermTokensByUsername(String username) {
        return roleMapper.getRolePermTokensByUsername(username);
    }
}
