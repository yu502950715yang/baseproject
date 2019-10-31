package com.example.baseproject.common.cache;

import com.google.common.cache.RemovalListener;
import com.google.common.cache.RemovalNotification;

/**
 * Guava cache监听
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2019-10-21 16:19
 */
public class CacheRemovalListener implements RemovalListener<Object, Object> {

    @Override
    public void onRemoval(RemovalNotification<Object, Object> removalNotification) {
        String tips = String.format("key=%s,value=%s,reason=%s", removalNotification.getKey(),
                removalNotification.getValue(), removalNotification.getCause());
        System.out.println(tips);
    }
}
