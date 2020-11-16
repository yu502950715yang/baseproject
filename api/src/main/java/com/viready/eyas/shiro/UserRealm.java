package com.viready.eyas.shiro;

import com.alibaba.druid.util.StringUtils;
import com.viready.eyas.model.User;
import com.viready.eyas.model.role.Role;
import com.viready.eyas.service.RoleService;
import com.viready.eyas.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:32
 */
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    /**
     * 执行授权逻辑
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        String username = String.valueOf(getAvailablePrincipal(principalCollection));
        if (null != username) {
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            List<Role> roles = roleService.getRolesByUsername(username);
            if (null != roles) {
                //加入角色
                roles.forEach(role -> info.addRole(role.getRoleName()));
            }
            List<String> permToken = roleService.getRolePermTokensByUsername(username);
            if (null != permToken) {
                //加入用户许可标记
                info.addStringPermissions(permToken);
            }
            return info;
        }
        return null;
    }

    /**
     * 执行认证逻辑
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        String username = token.getUsername();
        if (!StringUtils.isEmpty(username)) {
            User user = userService.getUserByUsername(username);
            if (null != user) {
                return new SimpleAuthenticationInfo(user.getUsername(), user.getPassword(), getName());
            }
        }
        return null;
    }
}
