package com.viready.eyas.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.viready.eyas.model.menu.Menu;
import com.viready.eyas.model.menu.MenuVo;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 菜单接口
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-30 15:08
 */
public interface MenuService extends IService<Menu> {

    void initMenuRefreshFlag(HttpServletRequest request);

    /**
     * 根据用户权限获取管理端菜单
     * @return 后台菜单
     */
    List<MenuVo> getMenuData();
}
