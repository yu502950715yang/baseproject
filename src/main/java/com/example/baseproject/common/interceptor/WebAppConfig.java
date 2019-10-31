package com.example.baseproject.common.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 拦截器配置
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-31 14:08
 */
@Configuration
public class WebAppConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new InterceptorConfig())
                .addPathPatterns("/**")
                .excludePathPatterns("/login");
    }
}
