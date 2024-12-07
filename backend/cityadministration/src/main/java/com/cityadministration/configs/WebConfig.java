package com.cityadministration.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:D:/lr5web/java567/backend/cityadministration/src/main/resources/static/images/")
                .setCachePeriod(0);
        registry.addResourceHandler("/news_images/**")
                .addResourceLocations("file:D:/lr5web/java567/backend/cityadministration/src/main/resources/static/news_images/")
                .setCachePeriod(0);
    }
}

