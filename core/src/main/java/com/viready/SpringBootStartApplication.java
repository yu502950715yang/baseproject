package com.viready;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@MapperScan(basePackages = {"com.viready.**.mapper"})
@EnableCaching
public class SpringBootStartApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootStartApplication.class, args);
    }

}