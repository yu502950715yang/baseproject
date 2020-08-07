package com.viready.eyas.aop;

import com.viready.eyas.cache.MenuCache;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-07 10:33
 */
@Aspect
@Component
public class MenuAspectJ {

    private final MenuCache menuCache;

    public MenuAspectJ(MenuCache menuCache) {
        this.menuCache = menuCache;
    }

    @After("execution(* com.viready..*.*Controller.*(..))")
    public void setMenuId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String menuId = request.getParameter("menuId");
        if (menuId != null) {
            request.setAttribute("menu", menuCache.getMenu(menuId));
        }
    }

}
