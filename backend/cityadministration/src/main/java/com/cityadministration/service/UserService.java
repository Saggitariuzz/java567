package com.cityadministration.service;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO registerUser(UserCreateDTO userCreateDTO);
}
