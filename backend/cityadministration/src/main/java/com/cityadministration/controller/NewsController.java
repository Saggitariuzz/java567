package com.cityadministration.controller;

import com.cityadministration.exception.FileUploadException;
import com.cityadministration.service.NewsService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {

    private NewsService newsService;

    @GetMapping("/check-access")
    public ResponseEntity<?> checkAccess(HttpSession session){
        return newsService.allowModerActivity(session);
    }

    @PostMapping("/add-news")
    public ResponseEntity<?> addNews(
            HttpSession session,
            @RequestParam String header,
            @RequestParam String text,
            @RequestParam(required = false, value = "image") MultipartFile image
            ){
        return newsService.addNews(session, header, text, image);
    }

    @GetMapping("/get-news")
    public ResponseEntity<?> getNews(){
        return newsService.getNews();
    }

    @DeleteMapping("/delete-news/{id}")
    public ResponseEntity<?> deleteNews(HttpSession session, @PathVariable Long id){
        return newsService.deleteNews(session, id);
    }

    @PutMapping("/update-news/{id}")
    public ResponseEntity<?> updateNews(
            HttpSession session,
            @PathVariable Long id,
            @RequestParam String header,
            @RequestParam String text,
            @RequestParam(required = false, value = "image") MultipartFile image,
            @RequestParam boolean removeImage
    ){
            return newsService.updateNews(
                session,
                id,
                header,
                text,
                image,
                removeImage
        );
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> handleFileUploadException(FileUploadException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handlemMaxUploadSizeExceededException (
            MaxUploadSizeExceededException ex
    ){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
