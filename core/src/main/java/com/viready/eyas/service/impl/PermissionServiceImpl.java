package com.viready.eyas.service.impl;

import com.viready.eyas.dao.PermissionMapper;
import com.viready.eyas.model.PermissionTreeNode;
import com.viready.eyas.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 权限service实现类
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-06 17:07
 */
@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public List<PermissionTreeNode> getPermissionTree() {
        return permissionMapper.getPermissionTree();
    }
}
