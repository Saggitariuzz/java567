package com.cityadministration.mapper;

import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.FileUploadException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class UserMapper {

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
