package com.cityadministration.service.impl;

import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.News;
import com.cityadministration.mapper.NewsMapper;
import com.cityadministration.repository.NewsRepository;
import com.cityadministration.service.NewsService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NewsServiceImpl implements NewsService {

    private NewsRepository newsRepository;

    @Override
    public ResponseEntity<?> allowModerActivity(HttpSession session){
        UserResponseDTO userResponseDTO = (UserResponseDTO) session.getAttribute("user");
        if(userResponseDTO == null
                || (!userResponseDTO.getRole().equals("ADMIN")
                && !userResponseDTO.getRole().equals("MODER"))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> addNews(
            HttpSession session,
            String header,
            String text,
            MultipartFile image
    ){
        ResponseEntity<?> checkAccess = allowModerActivity(session);
        if(checkAccess.getStatusCode() != HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("У Вас недостаточно прав");
        }
        News news = new News();
        news.setHeader(header);
        news.setText(text);
        news.setWhenPublished(LocalDateTime.now());
        news.setImage(NewsMapper.processImage(image));
        newsRepository.save(news);
        return ResponseEntity.ok(news);
    }

    @Override
    public ResponseEntity<?> getNews(){
        return ResponseEntity.ok(newsRepository.findAll());
    }

    @Override
    public ResponseEntity<?> deleteNews(HttpSession session, Long id){
        ResponseEntity<?> checkAccess = allowModerActivity(session);
        if(checkAccess.getStatusCode() != HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("У Вас недостаточно прав");
        }
        Optional<News> optionalNews = newsRepository.findById(id);
        if(optionalNews.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Новость не найдена");
        }
        News news = optionalNews.get();
        NewsMapper.deleteImage(news.getImage());
        newsRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateNews(
            HttpSession session,
            Long id,
            String header,
            String text,
            MultipartFile image,
            boolean removeImage
    ){
        ResponseEntity<?> checkAccess = allowModerActivity(session);
        if(checkAccess.getStatusCode() != HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("У Вас недостаточно прав");
        }
        Optional<News> optionalNews = newsRepository.findById(id);
        if(optionalNews.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Новость не найдена");
        }
        News news = optionalNews.get();
        news.setHeader(header);
        news.setText(text);
        news.setWhenPublished(LocalDateTime.now());
        String userImage = news.getImage();
        /*if(removeImage && image != null){
            NewsMapper.deleteImage(news.getImage());
            news.setImage(NewsMapper.processImage(image));
        }
        else if (removeImage){
            news.setImage(NewsMapper.deleteImage(userImage));
        }
        else if(image != null){
            NewsMapper.deleteImage(news.getImage());
            news.setImage(NewsMapper.processImage(image));
        }*/
        if(removeImage){
            news.setImage(NewsMapper.deleteImage(news.getImage()));
        }
        if(image!=null){
            if(news.getImage()!=null){
                NewsMapper.deleteImage(news.getImage());
            }
            news.setImage(NewsMapper.processImage(image));
        }
        newsRepository.save(news);
        return ResponseEntity.ok(news);
    }

}
