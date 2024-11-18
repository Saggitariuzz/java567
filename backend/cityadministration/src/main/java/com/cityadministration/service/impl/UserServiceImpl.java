package com.cityadministration.service.impl;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.FileUploadException;
import com.cityadministration.mapper.UserMapper;
import com.cityadministration.repository.UserRepository;
import com.cityadministration.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> registerUser(UserCreateDTO userCreateDTO) {
        Optional<String> error = checkIfUserExists(userCreateDTO);
        if (error.isPresent()) {
            return new ResponseEntity<>(error.get(), HttpStatus.CONFLICT);
        }
        error = validateUserInput(userCreateDTO);
        if (error.isPresent()) {
            return new ResponseEntity<>(error.get(), HttpStatus.BAD_REQUEST);
        }
        User savedUser = userRepository.save(UserMapper.userCreateDtoToUser(userCreateDTO));
        return ResponseEntity.ok(UserMapper.userToUserResponseDto(savedUser));
    }

    @Override
    public ResponseEntity<?> loginUser(UserLoginDTO userLoginDTO, HttpSession session) {
        Optional<User> userOptional = userRepository.findByUsername(userLoginDTO.getUsername());
        if(userOptional.isEmpty()){
            return new ResponseEntity<>
                    ("Пользователь с таким логином не зарегистрирован", HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        if (!user.getPassword().equals(userLoginDTO.getPassword())) {
            return new ResponseEntity<>("Неправильный пароль", HttpStatus.UNAUTHORIZED);
        }
        UserResponseDTO userResponseDTO = UserMapper.userToUserResponseDto(user);
        session.setAttribute("user", userResponseDTO);
        System.out.println(session.getAttribute("user"));
        return ResponseEntity.ok(userResponseDTO);
    }

    @Override
    public ResponseEntity<?> checkUserLogin(HttpSession session){
        UserResponseDTO userResponseDTO = (UserResponseDTO) session.getAttribute("user");
        if(userResponseDTO == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDashBoard(HttpSession session){
        UserResponseDTO userResponseDTO = (UserResponseDTO) session.getAttribute("user");
        if(userResponseDTO == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(userResponseDTO);
    }

    @Override
    public ResponseEntity<?> userLogout(HttpSession session){
        if(session.getAttribute("user") == null){
            return new ResponseEntity<>("Вы не вошли в аккаунт", HttpStatus.BAD_REQUEST);
        }
        session.removeAttribute("user");
        return ResponseEntity.ok("Вы успешно вышли из аккаунта");
    }

    private Optional<String> checkIfUserExists(UserCreateDTO userCreateDTO) {
        if (userRepository.findByUsername(userCreateDTO.getUsername()).isPresent()) {
            return Optional.of("Пользователь с таким логином уже зарегистрирован");
        }
        if (userRepository.findByEmail(userCreateDTO.getEmail()).isPresent()) {
            return Optional.of("Пользователь с такой почтой уже зарегистрирован");
        }
        return Optional.empty();
    }

    private Optional<String> validateUserInput(UserCreateDTO userCreateDTO) {
        if (!userCreateDTO.getUsername().matches
                ("^[a-zA-Z0-9]+$")) {
            return Optional.of("Неверное имя пользователя. " +
                    "Используйте только латинские буквы и цифры");
        }
        if (!userCreateDTO.getEmail().matches
                ("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            return Optional.of("Неверный адрес электронной почты");
        }
        if (!userCreateDTO.getPassword().matches
                ("^[a-zA-Z0-9!@#$%^&*()_\\-+=\\[\\]{}|;:'\",.<>?/]{5,}$")) {
            return Optional.of("Пароль должен содержать минимум 5 символов: букв латинского" +
                    " алфавита, цифр или спецсимволов");
        }
        return Optional.empty();
    }
}