package com.viready.eyas.init;

import com.viready.eyas.cache.MenuCache;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * 启动前执行
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-07 11:29
 */
@Service
@Lazy(false)
public class StartUpService {

    private final MenuCache menuCache;

    public StartUpService(MenuCache menuCache) {
        this.menuCache = menuCache;
    }

    @PostConstruct
    public void init() {
        menuCache.init();
    }
}
