package com.cityadministration.mapper;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class UserMapper {

    private static final String DEFAULT_ROLE = "USER";

    private final static String IMAGE_PATH = "D:\\lr5web\\java567\\backend\\cityadministration" +
            "\\src\\main\\resources\\static\\images";

    public static User userCreateDtoToUser (UserCreateDTO userCreateDTO){
        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setPassword(userCreateDTO.getPassword());
        user.setEmail(userCreateDTO.getEmail());
        user.setRole(DEFAULT_ROLE);
        if (userCreateDTO.getAvatar() != null) {
            try {
                MultipartFile avatar = userCreateDTO.getAvatar();
                String Filename = userCreateDTO.getUsername() + "_" + avatar.getOriginalFilename();
                File file = new File(IMAGE_PATH, Filename);
                avatar.transferTo(file);
                user.setAvatar(IMAGE_PATH + "\\" + Filename);
            } catch (IOException e) {
                throw new FileUploadException("Не удалось загрузить аватар");
            }
        }else {
            user.setAvatar(IMAGE_PATH + "\\DEFAULT.png");
        }
        return user;
    }

    public static UserResponseDTO userToUserResponseDto (User user){
        try{
            byte[] avatar = Files.readAllBytes(Paths.get(user.getAvatar()));
            return new UserResponseDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    avatar,
                    user.getRole()
            );
        }catch (IOException ex){
            throw new FileUploadException("Не удалось загрузить файл");
        }
    }
}
