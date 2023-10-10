package com.bende;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
@EnableJpaRepositories
@SpringBootApplication(scanBasePackages = {"com.bende.api", "com.bende.persistence.model", "com.bende", "com.bende.service"})
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*").allowedOrigins("http://localhost:4200");
            }
        };
    }

}
*/

@EnableJpaRepositories
@SpringBootApplication(scanBasePackages = {"com.bende.api", "com.bende.persistence.model", "com.bende", "com.bende.service"})
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(applicationClass, args);

    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        setRegisterErrorPageFilter(false);
        return application.sources(applicationClass);
    }

    private static Class<Application> applicationClass = Application.class;
}
