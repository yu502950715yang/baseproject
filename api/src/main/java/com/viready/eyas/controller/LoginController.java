package com.viready.eyas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-15 13:02
 */
@Controller
public class LoginController {

    @GetMapping("/login")
    public String index() {
        return "login";
    }
}
