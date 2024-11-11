package com.cityadministration.service;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> registerUser(UserCreateDTO userCreateDTO);

    ResponseEntity<?> loginUser(UserLoginDTO userLoginDTO, HttpSession session);

    ResponseEntity<?> checkUserLogin(HttpSession session);

    ResponseEntity<?> getDashBoard(HttpSession session);
}

