package com.cityadministration.controller;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.exception.DuplicateUserException;
import com.cityadministration.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserCreateDTO userCreateDTO){
        UserResponseDTO userResponseDTO = userService.registerUser(userCreateDTO);
        return new ResponseEntity<UserResponseDTO>(userResponseDTO, HttpStatus.CREATED);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<String> handleDuplicateUserException(DuplicateUserException ex){
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}
