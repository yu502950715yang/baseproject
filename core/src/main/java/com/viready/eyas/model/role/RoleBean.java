package com.viready.eyas.model.role;

import com.viready.eyas.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * 角色bean
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-20 16:32
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class RoleBean extends Role {

    List<User> userList;
}
