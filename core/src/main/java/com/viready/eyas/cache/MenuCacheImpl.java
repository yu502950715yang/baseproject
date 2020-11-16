package com.viready.eyas.cache;

import com.viready.eyas.model.menu.Menu;
import com.viready.eyas.service.MenuService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 菜单缓存
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-07 10:48
 */
@Service
public class MenuCacheImpl implements MenuCache {

    private final MenuService menuService;

    private Map<String, Menu> menuMap = new HashMap<>();

    public MenuCacheImpl(MenuService menuService) {
        this.menuService = menuService;
    }

    @Override
    public void init() {
        List<Menu> menuList = menuService.list();
        menuMap = menuList.stream().collect(Collectors.toMap(Menu::getMenuId, a -> a, (k1, k2) -> k1));
    }

    @Override
    public Menu getMenu(String menuId) {
        return menuMap == null ? null : menuMap.get(menuId);
    }
}
