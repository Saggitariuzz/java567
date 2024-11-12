package com.cityadministration.controller;

import com.cityadministration.service.VisitorService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorController {

    private final VisitorService visitorService;

    @Autowired
    public HttpSession session;

    @GetMapping("/incrementvisitor")
    public ResponseEntity<?> incrementVisitorCount(){
        return visitorService.incrementVisitorCount(session);
    }
}