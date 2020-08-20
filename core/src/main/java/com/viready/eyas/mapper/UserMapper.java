package com.viready.eyas.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.viready.eyas.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户mapper
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:20
 */
@Repository
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据角色id获取用户列表
     *
     * @param roleId 角色id
     * @return 用户list
     */
    List<User> listByRoleId(Integer roleId);
}
