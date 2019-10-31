package com.example.baseproject.common.cache;

import com.google.common.cache.CacheBuilder;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * 缓存配置
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-18 13:32
 */
@Configuration
@EnableCaching
public class GuavaCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        GuavaCacheManager cacheManager = new GuavaCacheManager();
        cacheManager.setCacheBuilder(
                CacheBuilder.newBuilder()
                        .expireAfterAccess(10, TimeUnit.SECONDS)
                        .maximumSize(1000).removalListener(new CacheRemovalListener()));
        return cacheManager;
    }
}
