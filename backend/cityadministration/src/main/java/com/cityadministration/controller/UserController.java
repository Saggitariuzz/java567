package com.cityadministration.controller;

import com.cityadministration.entity.User;
import com.cityadministration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody User user
    ){
        user.setRole("USER");
        String response = userService.register(user);
        return switch (response) {
            case "SUCCESS" -> ResponseEntity.ok("Вы успешно зарегистрировались");
            case "ALREADY_EXIST_NAME" -> ResponseEntity.status(500).body("Пользователь с таким логином уже существует");
            case "ALREADY_EXIST_EMAIL" ->
                    ResponseEntity.status(500).body("Пользователь с такой электронной почтой уже существует");
            default -> ResponseEntity.status(400).body("Ошибка подключения");
        };
    }
}
