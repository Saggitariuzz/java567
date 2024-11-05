package com.cityadministration.service.impl;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.DuplicateUserException;
import com.cityadministration.exception.FileUploadException;
import com.cityadministration.mapper.UserMapper;
import com.cityadministration.repository.UserRepository;
import com.cityadministration.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public UserResponseDTO registerUser(UserCreateDTO userCreateDTO) {
        if(userRepository.findByUsername(userCreateDTO.getUsername()).isPresent()){
            throw new DuplicateUserException("Пользователь с таким логином уже зарегистрирован");
        }
        if(userRepository.findByEmail(userCreateDTO.getEmail()).isPresent()){
            throw new DuplicateUserException("Пользователь с такой электронной почтой уже зарегистрирован");
        }

        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setPassword(userCreateDTO.getPassword());
        user.setEmail(userCreateDTO.getEmail());
        user.setRole("USER");
        if(userCreateDTO.getAvatar() != null){
            try{
                String path = "D:\\web5\\java567\\backend\\cityadministration\\src\\main\\resources" +
                        "\\static\\images";
                MultipartFile avatar = userCreateDTO.getAvatar();
                String Filename = userCreateDTO.getUsername() + "_" + avatar.getOriginalFilename();
                File file = new File(path, Filename);
                avatar.transferTo(file);
                user.setAvatar(Filename);
            } catch (IOException e) {
                throw new FileUploadException("Не удалось загрузить аватар");
            }
        }
        User savedUser = userRepository.save(user);
        return UserMapper.userToUserResponseDto(savedUser);
    }
}
