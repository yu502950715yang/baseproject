package com.viready.eyas.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.viready.eyas.model.User;
import org.springframework.stereotype.Repository;

/**
 * 用户mapper
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-17 13:20
 */
@Repository
public interface UserMapper extends BaseMapper<User> {
}
