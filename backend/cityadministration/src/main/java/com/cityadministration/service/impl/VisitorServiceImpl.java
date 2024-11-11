package com.cityadministration.service.impl;

import com.cityadministration.entity.Visitor;
import com.cityadministration.repository.VisitorRepository;
import com.cityadministration.service.VisitorService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class VisitorServiceImpl implements VisitorService {

    private VisitorRepository visitorRepository;

    @Override
    public void incrementVisitorCount(HttpSession session){
        if(session.getAttribute("visited") == null){
            Optional<Visitor> visitorOptional = visitorRepository.findById(1L);
            if(visitorOptional.isPresent()){
                Visitor visitor = visitorOptional.get();
                Long count = visitor.getCount();
                visitor.setCount(count+1);
                visitorRepository.save(visitor);
            }
        }
        session.setAttribute("visited", "true");
    }

    @Override
    public ResponseEntity<?> getVisitorsCount(){
        Optional<Visitor> visitorOptional = visitorRepository.findById(1L);
        if(visitorOptional.isPresent()){
            Visitor visitor = visitorOptional.get();
            return ResponseEntity.ok(visitor.getCount().toString());
        }
        return new ResponseEntity<>
                ("Не удается загрузить количество посетителей", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
