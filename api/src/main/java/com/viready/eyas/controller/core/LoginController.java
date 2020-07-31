package com.viready.eyas.controller.core;

import com.viready.eyas.captcha.RandomImage;
import com.viready.eyas.captcha.impl.RandomImageImpl;
import com.viready.eyas.model.User;
import com.viready.eyas.service.MenuService;
import com.viready.eyas.service.UserService;
import com.viready.eyas.util.HttpUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserService userService;
    @Autowired
    private MenuService menuService;

    @GetMapping()
    public String loginPage() {
        return "/login";
    }

    @GetMapping("/captcha")
    public void viewCaptcha(HttpServletResponse response) throws IOException {
        final int width = 100;
        final int height = 34;
        final int length = 4;
        RandomImage randomImage = new RandomImageImpl(length, width, height);
        //将验证码保存在session中
        SecurityUtils.getSubject().getSession().setAttribute("captchaInSession", randomImage.getValidateString());
        //关闭客户端浏览器的缓冲区。
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        ImageIO.write(randomImage.getValidateImage(), "png", response.getOutputStream());
        response.getOutputStream().flush();
    }

    @PostMapping
    public String loginPost(User user, String captcha, RedirectAttributes redirectAttributes, HttpServletRequest request) {
        if (checkCaptcha(captcha, redirectAttributes)) {
            return "redirect:/login";
        }
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        try {
            currentUser.login(token);
        } catch (AuthenticationException e) {
            redirectAttributes.addFlashAttribute("message", "用户名或密码错误!");
            logger.info("error", e);
            return "redirect:/login";
        }
        if (currentUser.isAuthenticated()) {
            sessionHandle(user, request);
            return "redirect:" + getSavedUrl(request);
        } else {
            redirectAttributes.addFlashAttribute("message", "用户名或密码错误!");
            return "redirect:/login";
        }
    }

    private boolean checkCaptcha(String captcha, RedirectAttributes redirectAttributes) {
        Object captchaInSession = SecurityUtils.getSubject().getSession().getAttribute("captchaInSession");
        if (captchaInSession != null && !captcha.equals(captchaInSession)) {
            redirectAttributes.addFlashAttribute("message", "验证码错误！请重试！");
            return true;
        }
        return false;
    }

    private String getSavedUrl(HttpServletRequest request) {
        SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(request);
        if (savedRequest == null) {
            return "/";
        }
        String savedUrl = savedRequest.getRequestUrl().replaceFirst(request.getContextPath(), "");
        if (!savedUrl.contains("menuId")) {
            savedUrl = "/";
        }
        return savedUrl;
    }

    private void sessionHandle(User user, HttpServletRequest request) {
        User loginUser = userService.getUserByUsername(user.getUsername());
        HttpUtil.saveUserToSession(loginUser);
        menuService.initMenuRefreshFlag(request);
    }
}
