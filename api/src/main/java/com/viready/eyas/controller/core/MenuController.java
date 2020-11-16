package com.viready.eyas.controller.core;

import com.viready.eyas.common.response.AjaxResponse;
import com.viready.eyas.model.menu.MenuVo;
import com.viready.eyas.service.MenuService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 菜单controller
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-29 15:31
 */
@Controller
@RequestMapping("/core/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/sidebarData")
    @ResponseBody
    public AjaxResponse<List<MenuVo>> showSidebar() {
        return new AjaxResponse<>(menuService.getMenuData());
    }
}
