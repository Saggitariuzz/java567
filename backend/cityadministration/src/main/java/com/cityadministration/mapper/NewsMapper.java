package com.cityadministration.mapper;

import com.cityadministration.exception.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.SecureRandom;

public class NewsMapper {

    private final static String IMAGE_PATH = "D:\\lr5web\\java567\\backend\\cityadministration" +
            "\\src\\main\\resources\\static\\news_images";

    private final static String IMAGE_URL = "http://localhost:8080/news_images/";

    private static final int UNIQUE_PART_SIZE = 10;

    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String processImage(MultipartFile image){
        if (image != null) {
            if(image.isEmpty()){
                throw new FileUploadException("Невозможно загрузить пустой файл");
            }
            try {
                SecureRandom secureRandom = new SecureRandom();
                StringBuilder result = new StringBuilder(UNIQUE_PART_SIZE);
                for(int i = 0; i < UNIQUE_PART_SIZE; i++){
                    int index = secureRandom.nextInt(CHARACTERS.length());
                    result.append(CHARACTERS.charAt(index));
                }
                String Filename = result + "_" + image.getOriginalFilename();
                File file = new File(IMAGE_PATH, Filename);
                image.transferTo(file);
                return IMAGE_URL + Filename;
            } catch (IOException e) {
                throw new FileUploadException("Не удалось загрузить изображение");
            }
        }else {
            return null;
        }
    }

    public static String deleteImage(String image){
        if(image == null){
            return null;
        }
        try{
            String filename = image.substring(image.lastIndexOf("/")+1);
            Files.delete(Paths.get(IMAGE_PATH, filename));
            return null;
        }catch (IOException ex){
            throw new FileUploadException("Не удалось удалить изображение");
        }
    }

}
