package com.cityadministration.service;

import com.cityadministration.entity.User;
import com.cityadministration.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user){
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return "ALREADY_EXIST_NAME";
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return "ALREADY_EXIST_EMAIL";
        }
        userRepository.save(user);
        return "SUCCESS";
    }
}
