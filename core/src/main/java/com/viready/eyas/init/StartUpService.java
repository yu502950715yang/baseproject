package com.viready.eyas.init;

import com.viready.eyas.cache.MenuCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-08-07 11:29
 */
@Service
@Lazy(false)
public class StartUpService {

    @Autowired
    private MenuCache menuCache;

    @PostConstruct
    public void init() {
        menuCache.init();
    }
}
