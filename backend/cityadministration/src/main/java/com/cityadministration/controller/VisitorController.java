package com.cityadministration.controller;

import com.cityadministration.service.VisitorService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorController {

    private final VisitorService visitorService;

    @GetMapping("/incrementvisitor")
    public void incrementVisitorCount(HttpSession session){
        visitorService.incrementVisitorCount(session);
    }

    @GetMapping("/getvisitorcount")
    public ResponseEntity<?> getVisitorCount(){
        return visitorService.getVisitorsCount();
    }
}
