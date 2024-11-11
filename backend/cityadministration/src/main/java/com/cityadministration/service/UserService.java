package com.cityadministration.service;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import com.cityadministration.dto.UserResponseDTO;

public interface UserService {

    UserResponseDTO registerUser(UserCreateDTO userCreateDTO);

    UserResponseDTO loginUser(UserLoginDTO userLoginDTO);
}
