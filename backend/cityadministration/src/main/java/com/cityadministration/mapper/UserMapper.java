package com.cityadministration.mapper;

import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;

public class UserMapper {

    public static User userResponseDtoToUser(UserResponseDTO userResponseDTO){
        return new User(
                userResponseDTO.getId(),
                userResponseDTO.getUsername(),
                userResponseDTO.getPassword(),
                userResponseDTO.getEmail(),
                userResponseDTO.getAvatar(),
                userResponseDTO.getRole()
        );
    }

    public static UserResponseDTO userToUserResponseDto (User user){
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getAvatar(),
                user.getRole()
        );
    }
}
