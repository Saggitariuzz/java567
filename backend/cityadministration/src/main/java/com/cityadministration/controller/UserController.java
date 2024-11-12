package com.cityadministration.controller;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import com.cityadministration.exception.FileUploadException;
import com.cityadministration.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    public HttpSession session;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(value="avatar", required=false) MultipartFile avatar
    ){
        UserCreateDTO userCreateDTO = new UserCreateDTO(username,password,email,avatar);
        return userService.registerUser(userCreateDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO){
        return userService.loginUser(userLoginDTO, session);
    }

    @GetMapping("/checklogin")
    public ResponseEntity<?> checkLogin(){
        return userService.checkUserLogin(session);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashBoard(){
        return userService.getDashBoard(session);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> userLogout(){
        return userService.userLogout(session);
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> handleFileUploadException(FileUploadException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
