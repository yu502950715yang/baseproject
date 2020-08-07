package com.viready.eyas.service;

import com.viready.eyas.model.PermissionTreeNode;

import java.util.List;

/**
 * 权限service
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-06 17:05
 */
public interface PermissionService {

    /**
     * 获取权限树所有节点
     * @return 权限节点
     */
    List<PermissionTreeNode> getPermissionTree();
}
