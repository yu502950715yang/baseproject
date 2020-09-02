package com.viready.eyas.shiro;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * shiro配置文件
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 17:25
 */
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        //设置securityManager
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        Map<String, String> filterMap = new LinkedHashMap<>();
        // anon：它对应的过滤器里面是空的,什么都没做,可以理解为不拦截
        // authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问
        filterMap.put("/assets/**", "anon");
        filterMap.put("/global/**", "anon");
        filterMap.put("/html/**", "anon");
        filterMap.put("/img/**", "anon");
        filterMap.put("/js/**", "anon");
        filterMap.put("/download/**", "anon");
        filterMap.put("/templates/**", "anon");
        filterMap.put("/css/**", "anon");
        filterMap.put("/logout", "logout");
        filterMap.put("/login", "anon");
        filterMap.put("/login/captcha", "anon");
        filterMap.put("/error", "anon");
        filterMap.put("/autoComplete", "anon");
        filterMap.put("/file/**", "anon");
        filterMap.put("/swagger-ui.html", "anon");
        filterMap.put("/swagger-resources/**", "anon");
        filterMap.put("/**/*.css", "anon");
        filterMap.put("/**/*.js", "anon");
        filterMap.put("/**/*.png", "anon");
        filterMap.put("/**/*.jpg", "anon");
        filterMap.put("/**/*.jpeg", "anon");
        filterMap.put("/**/*.gif", "anon");
        filterMap.put("/**/*.svg", "anon");
        filterMap.put("/v2/api-docs", "anon");
        filterMap.put("/**", "authc");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterMap);

        //修改认证失败跳转页面
        shiroFilterFactoryBean.setLoginUrl("/login");
        shiroFilterFactoryBean.setUnauthorizedUrl("/error/403");
        return shiroFilterFactoryBean;
    }

    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(UserRealm userRealm) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //关联realm
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    // 创建Realm
    @Bean(name = "userRealm")
    public UserRealm getUserRealm() {
        return new UserRealm();
    }
}
