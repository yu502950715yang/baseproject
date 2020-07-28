package com.viready.eyas.task;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

/**
 * 测试定时任务
 *
 * @author Eric
 * @since 1.0
 * Create with Intellij IDEA on 2020-07-23 17:50
 */
@Configuration
@EnableScheduling
public class TestTask {

    @Scheduled(cron = "0/5 * * * * ?")
    //或直接指定时间间隔，例如：5秒
    //@Scheduled(fixedRate=5000)
    private void configureTasks() {
        System.err.println("执行静态定时任务时间: " + LocalDateTime.now());
    }
}
