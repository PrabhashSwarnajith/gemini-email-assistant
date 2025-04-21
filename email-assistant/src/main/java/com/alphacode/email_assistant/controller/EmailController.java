package com.alphacode.email_assistant.controller;

import com.alphacode.email_assistant.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alphacode.email_assistant.dto.EmailDto;


@RestController
@RequestMapping("/api/v1/email")
@CrossOrigin(origins = "http://localhost:5173")	
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailDto emailReqest) {
        String response = emailService.generateEmailReply(emailReqest);
        return ResponseEntity.ok(response);
    }
}