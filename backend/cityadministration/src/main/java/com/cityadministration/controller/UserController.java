package com.cityadministration.controller;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.exception.DuplicateUserException;
import com.cityadministration.exception.FileUploadException;
import com.cityadministration.exception.PasswordDontMatchException;
import com.cityadministration.exception.UserNotFoundException;
import com.cityadministration.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(value="avatar", required=false) MultipartFile avatar
    ){
        UserCreateDTO userCreateDTO = new UserCreateDTO(username,password,email,avatar);
        UserResponseDTO userResponseDTO = userService.registerUser(userCreateDTO);
        return new ResponseEntity<>(userResponseDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO){
        UserResponseDTO userResponseDTO = userService.loginUser(userLoginDTO);
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<String> handleDuplicateUserException(DuplicateUserException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> handleFileUploadException(FileUploadException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PasswordDontMatchException.class)
    public ResponseEntity<String> handlePasswordDontMatchException(PasswordDontMatchException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
