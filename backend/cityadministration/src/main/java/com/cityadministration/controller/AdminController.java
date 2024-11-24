package com.cityadministration.controller;

import com.cityadministration.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private AdminService adminService;

    @GetMapping("/getusers")
    public ResponseEntity<?> getUsers(HttpSession session){
        return adminService.getUsers(session);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(HttpSession session, @PathVariable Long id){
        return adminService.deleteUser(session, id);
    }

    @GetMapping("/update/{id}")
    public ResponseEntity<?> getInfo(@PathVariable Long id, HttpSession session){
        return adminService.getInfo(id, session);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            HttpSession session,
            @PathVariable Long id,
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(value="avatar", required=false) MultipartFile avatar,
            @RequestParam String role,
            @RequestParam String deleteAvatar
    ){
        return adminService.updateUser(
                session,
                id,
                username,
                password,
                email,
                avatar,
                role,
                deleteAvatar
        );
    }

    @PostMapping("/adduser")
    public ResponseEntity<?> addUser(
            HttpSession session,
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam(value="avatar", required=false) MultipartFile avatar,
            @RequestParam String role
    ){
        return adminService.addUser(
                session,
                username,
                password,
                email,
                role,
                avatar
        );
    }
}
