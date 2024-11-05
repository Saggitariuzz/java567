package com.cityadministration.service.impl;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.DuplicateUserException;
import com.cityadministration.mapper.UserMapper;
import com.cityadministration.repository.UserRepository;
import com.cityadministration.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        User savedUser = userRepository.save(user);
        return UserMapper.userToUserResponseDto(savedUser);
    }
}
