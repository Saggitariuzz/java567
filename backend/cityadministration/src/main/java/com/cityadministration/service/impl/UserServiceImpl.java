package com.cityadministration.service.impl;

import com.cityadministration.dto.UserCreateDTO;
import com.cityadministration.dto.UserLoginDTO;
import com.cityadministration.dto.UserResponseDTO;
import com.cityadministration.entity.User;
import com.cityadministration.exception.FileUploadException;
import com.cityadministration.mapper.UserMapper;
import com.cityadministration.repository.UserRepository;
import com.cityadministration.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
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

    private final static String IMAGE_PATH = "D:\\web5\\java567\\backend\\cityadministration\\src\\main\\" +
            "resources\\static\\images";

    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> registerUser(UserCreateDTO userCreateDTO) {
        if (userRepository.findByUsername(userCreateDTO.getUsername()).isPresent()) {
            return new ResponseEntity<>("Пользователь с таким логином уже зарегистрирован",
                    HttpStatus.CONFLICT);
        }
        if (userRepository.findByEmail(userCreateDTO.getEmail()).isPresent()) {
            return new ResponseEntity<>("Пользователь с такой почтой уже зарегистрирован",
                    HttpStatus.CONFLICT);
        }
        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setPassword(userCreateDTO.getPassword());
        user.setEmail(userCreateDTO.getEmail());
        user.setRole("USER");
        if (userCreateDTO.getAvatar() != null) {
            try {
                MultipartFile avatar = userCreateDTO.getAvatar();
                String Filename = userCreateDTO.getUsername() + "_" + avatar.getOriginalFilename();
                File file = new File(IMAGE_PATH, Filename);
                avatar.transferTo(file);
                user.setAvatar(IMAGE_PATH + "\\" + Filename);
            } catch (IOException e) {
                throw new FileUploadException("Не удалось загрузить аватар");
            }
        }else {
            user.setAvatar(IMAGE_PATH + "\\DEFAULT.png");
        }
        User savedUser = userRepository.save(user);
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
}