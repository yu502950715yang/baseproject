package com.viready.eyas.cache;

import com.viready.eyas.model.menu.Menu;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-07 10:39
 */
public interface MenuCache {

    void init();

    /**
     * 根据菜单id获取菜单
     * @param menuId 菜单id
     * @return 菜单
     */
    Menu getMenu(String menuId);
}
