package com.cityadministration.service;


import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface NewsService {

    ResponseEntity<?> allowModerActivity(HttpSession session);

    ResponseEntity<?> addNews(
            HttpSession session,
            String header,
            String text,
            MultipartFile image
    );

    ResponseEntity<?> getNews();

    ResponseEntity<?> updateNews(
            HttpSession session,
            Long id,
            String header,
            String text,
            MultipartFile image,
            boolean removeImage
    );

    ResponseEntity<?> getNewsData(HttpSession session, Long id);

    ResponseEntity<?> deleteNews(HttpSession session, Long id);

}
