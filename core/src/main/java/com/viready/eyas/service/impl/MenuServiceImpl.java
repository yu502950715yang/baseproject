package com.viready.eyas.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.viready.eyas.dao.MenuMapper;
import com.viready.eyas.model.menu.Menu;
import com.viready.eyas.model.menu.MenuVo;
import com.viready.eyas.service.MenuService;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-30 15:21
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {

    private final String ROOT_MENU_PARENT_ID = "-1";

    @Override
    public void initMenuRefreshFlag(HttpServletRequest request) {
        request.getSession().setAttribute("sessionId", request.getSession().getId());
    }

    @Override
    public List<MenuVo> getMenuData() {
        Subject currentUser = SecurityUtils.getSubject();
        QueryWrapper<Menu> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("sort_id");
        queryWrapper.eq("status", 1);
        List<Menu> menuList = list(queryWrapper);
        List<Menu> userMenus = menuList.stream().filter(menu -> currentUser.isPermitted(menu.getPermToken())).collect(Collectors.toList());
        return new ArrayList<>(createTree(ROOT_MENU_PARENT_ID, userMenus));
    }

    private List<MenuVo> createTree(String parentId, List<Menu> menuList) {
        List<MenuVo> menuVoList = new ArrayList<>();
        menuList.forEach(menu -> {
            if (parentId.equals(menu.getParentId())) {
                MenuVo menuVo = new MenuVo();
                try {
                    BeanUtils.copyProperties(menuVo,menu);
                } catch (IllegalAccessException | InvocationTargetException e) {
                    e.printStackTrace();
                }
                menuVo.setChildren(createTree(menu.getMenuId(), menuList));
                menuVoList.add(menuVo);
            }
        });
        return menuVoList;
    }
}
