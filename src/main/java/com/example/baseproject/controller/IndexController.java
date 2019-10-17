package com.example.baseproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-15 13:02
 */
@RestController
public class IndexController {

    @GetMapping("/index")
    public String index() {
        return "Hello World";
    }
}
