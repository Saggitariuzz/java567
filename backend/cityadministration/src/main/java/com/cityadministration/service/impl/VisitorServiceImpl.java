package com.cityadministration.service.impl;

import com.cityadministration.entity.Visitor;
import com.cityadministration.repository.VisitorRepository;
import com.cityadministration.service.VisitorService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class VisitorServiceImpl implements VisitorService {

    private VisitorRepository visitorRepository;

    @Override
    @Transactional
    public ResponseEntity<?> incrementVisitorCount(HttpSession session){
        Optional<Visitor> visitorOptional = visitorRepository.findById(1L);
        Visitor visitor;
        if(visitorOptional.isPresent()){
            visitor = visitorOptional.get();
        }else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String visitedStatus = (String) session.getAttribute("visited");
        System.out.println("Visited status: " + visitedStatus);
        if(visitedStatus == null){
            Long count = visitor.getCount() + 1;
            visitor.setCount(count);
            visitorRepository.save(visitor);
            session.setAttribute("visited", "true");
        }
        return ResponseEntity.ok(visitor.getCount());
    }

}
