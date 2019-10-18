package com.example.baseproject.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheBuilderSpec;
import com.google.common.cache.CacheLoader;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Description on this file, you will change here.
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-18 14:36
 */
public class GuavaCacheManager implements CacheManager {
    private final ConcurrentMap<String, Cache> cacheMap = new ConcurrentHashMap(16);
    private boolean dynamic = true;
    private CacheBuilder<Object, Object> cacheBuilder = CacheBuilder.newBuilder();
    private CacheLoader<Object, Object> cacheLoader;
    private boolean allowNullValues = true;

    public GuavaCacheManager() {
    }

    public GuavaCacheManager(String... cacheNames) {
        this.setCacheNames(Arrays.asList(cacheNames));
    }

    public void setCacheNames(Collection<String> cacheNames) {
        if (cacheNames != null) {
            Iterator var2 = cacheNames.iterator();

            while(var2.hasNext()) {
                String name = (String)var2.next();
                this.cacheMap.put(name, this.createGuavaCache(name));
            }

            this.dynamic = false;
        } else {
            this.dynamic = true;
        }

    }

    public void setCacheBuilder(CacheBuilder<Object, Object> cacheBuilder) {
        Assert.notNull(cacheBuilder, "CacheBuilder must not be null");
        this.doSetCacheBuilder(cacheBuilder);
    }

    public void setCacheBuilderSpec(CacheBuilderSpec cacheBuilderSpec) {
        this.doSetCacheBuilder(CacheBuilder.from(cacheBuilderSpec));
    }

    public void setCacheSpecification(String cacheSpecification) {
        this.doSetCacheBuilder(CacheBuilder.from(cacheSpecification));
    }

    public void setCacheLoader(CacheLoader<Object, Object> cacheLoader) {
        if (!ObjectUtils.nullSafeEquals(this.cacheLoader, cacheLoader)) {
            this.cacheLoader = cacheLoader;
            this.refreshKnownCaches();
        }

    }

    public void setAllowNullValues(boolean allowNullValues) {
        if (this.allowNullValues != allowNullValues) {
            this.allowNullValues = allowNullValues;
            this.refreshKnownCaches();
        }

    }

    public boolean isAllowNullValues() {
        return this.allowNullValues;
    }

    public Collection<String> getCacheNames() {
        return Collections.unmodifiableSet(this.cacheMap.keySet());
    }

    public Cache getCache(String name) {
        Cache cache = (Cache)this.cacheMap.get(name);
        if (cache == null && this.dynamic) {
            synchronized(this.cacheMap) {
                cache = (Cache)this.cacheMap.get(name);
                if (cache == null) {
                    cache = this.createGuavaCache(name);
                    this.cacheMap.put(name, cache);
                }
            }
        }

        return cache;
    }

    protected Cache createGuavaCache(String name) {
        return new GuavaCache(name, this.createNativeGuavaCache(name), this.isAllowNullValues());
    }

    protected com.google.common.cache.Cache<Object, Object> createNativeGuavaCache(String name) {
        return (com.google.common.cache.Cache)(this.cacheLoader != null ? this.cacheBuilder.build(this.cacheLoader) : this.cacheBuilder.build());
    }

    private void doSetCacheBuilder(CacheBuilder<Object, Object> cacheBuilder) {
        if (!ObjectUtils.nullSafeEquals(this.cacheBuilder, cacheBuilder)) {
            this.cacheBuilder = cacheBuilder;
            this.refreshKnownCaches();
        }

    }

    private void refreshKnownCaches() {
        Iterator var1 = this.cacheMap.entrySet().iterator();

        while(var1.hasNext()) {
            Map.Entry<String, Cache> entry = (Map.Entry)var1.next();
            entry.setValue(this.createGuavaCache((String)entry.getKey()));
        }

    }
}