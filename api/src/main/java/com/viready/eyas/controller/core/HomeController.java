package com.viready.eyas.controller.core;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 主页controller
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-30 15:31
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
