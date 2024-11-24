package com.cityadministration.mapper;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.FileUploadException;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class UserMapper {

    private static final String DEFAULT_ROLE = "USER";

    private final static String IMAGE_PATH = "D:\\lr5web\\java567\\backend\\cityadministration" +
            "\\src\\main\\resources\\static\\images";

    private final static String IMAGE_URL = "http://localhost:8080/images/";

    private final static String DEFAULT_IMAGE_URL = "http://localhost:8080/images/DEFAULT.png";

    public static User userCreateDtoToUser (UserCreateDTO userCreateDTO){
        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setPassword(userCreateDTO.getPassword());
        user.setEmail(userCreateDTO.getEmail());
        user.setRole(DEFAULT_ROLE);
        user.setAvatar(processAvatar(userCreateDTO.getAvatar(), userCreateDTO.getUsername()));
        return user;
    }

    public static UserResponseDTO userToUserResponseDto (User user){
            return new UserResponseDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getAvatar(),
                    user.getRole()
            );
    }

    public static String processAvatar(MultipartFile avatar, String username){
        if (avatar != null) {
            try {
                String Filename = username + "_" + avatar.getOriginalFilename();
                File file = new File(IMAGE_PATH, Filename);
                avatar.transferTo(file);
                return IMAGE_URL + Filename;
            } catch (IOException e) {
                throw new FileUploadException("Не удалось загрузить аватар");
            }
        }else {
            return DEFAULT_IMAGE_URL;
        }
    }

    public static void deleteAvatar(String avatar){
        if(avatar.equals(DEFAULT_IMAGE_URL)){
            return;
        }
        try{
            String filename = avatar.substring(avatar.lastIndexOf("/")+1);
            Files.delete(Paths.get(IMAGE_PATH, filename));
        }catch (IOException ex){
            throw new FileUploadException("Не удалось удалить аватар");
        }
    }

    public static String getDefaultImageUrl(){
        return DEFAULT_IMAGE_URL;
    }
}

