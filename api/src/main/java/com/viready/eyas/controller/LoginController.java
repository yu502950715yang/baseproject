package com.viready.eyas.controller;

import com.viready.eyas.captcha.RandomImage;
import com.viready.eyas.captcha.impl.RandomImageImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-15 13:02
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping()
    public String loginPage() {
        return "/login";
    }

    @GetMapping("/captcha")
    public void viewCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final int width = 100;
        final int height = 34;
        final int length = 4;
        RandomImage randomImage = new RandomImageImpl(length, width, height);
        //将验证码保存在session中
//        SecurityUtils.getSubject().getSession().setAttribute("captchaInSession", randomImage.getValidateString());
        //关闭客户端浏览器的缓冲区。
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        ImageIO.write(randomImage.getValidateImage(), "png", response.getOutputStream());
        response.getOutputStream().flush();
    }
}
