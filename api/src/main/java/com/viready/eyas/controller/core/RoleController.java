package com.viready.eyas.controller.core;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageInfo;
import com.viready.eyas.common.page.DataTablesPage;
import com.viready.eyas.common.page.DataTablesResponse;
import com.viready.eyas.model.PermissionTreeNode;
import com.viready.eyas.model.role.Role;
import com.viready.eyas.service.PermissionService;
import com.viready.eyas.service.RoleService;
import com.viready.eyas.service.UserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 角色Controller
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-06 16:49
 */
@Controller
@RequestMapping("/core/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @Autowired
    private UserService userService;
    @Autowired
    private PermissionService permissionService;

    @GetMapping
    @RequiresPermissions("b:role:open")
    public String role(Model model) throws JsonProcessingException {
        model.addAttribute("userList", new ObjectMapper().writeValueAsString(userService.list()));
        List<PermissionTreeNode> permissionTreeNodes = permissionService.getPermissionTree();
        model.addAttribute("tree", new ObjectMapper().writeValueAsString(permissionTreeNodes));
        return "core/role/role";
    }

    @PostMapping("/getRoleListPage")
    @ResponseBody
    @RequiresPermissions("b:role:open")
    public DataTablesResponse<Role> getRoleListPage(Role role, DataTablesPage dataTablesPage) {
        PageInfo<Role> roleList = roleService.listPage(role, dataTablesPage);
        return new DataTablesResponse<>(roleList, dataTablesPage.getDraw());
    }
}
