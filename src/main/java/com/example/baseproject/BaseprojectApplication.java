package com.example.baseproject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.example.**.dao"})
public class BaseprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(BaseprojectApplication.class, args);
    }

}
