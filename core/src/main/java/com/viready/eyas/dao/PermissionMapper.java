package com.viready.eyas.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.viready.eyas.model.PermissionTreeNode;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 权限mapper
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-06 17:07
 */
@Repository
public interface PermissionMapper extends BaseMapper<PermissionTreeNode> {

    /**
     * 获取权限树节点
     *
     * @return 权限树节点
     */
    List<PermissionTreeNode> getPermissionTree();
}
