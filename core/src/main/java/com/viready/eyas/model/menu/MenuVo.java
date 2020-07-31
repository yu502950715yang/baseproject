package com.viready.eyas.model.menu;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * 菜单
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-30 16:43
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class MenuVo extends Menu {

    private List<MenuVo> children;
}
