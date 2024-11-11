package com.cityadministration.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

public interface VisitorService {

    void incrementVisitorCount(HttpSession session);

    ResponseEntity<?> getVisitorsCount();
}
