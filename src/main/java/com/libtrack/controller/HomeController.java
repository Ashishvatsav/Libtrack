package com.libtrack.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Libtrack API");
        response.put("application", "Library Management System");
        response.put("endpoints", Map.of(
            "books", "/books",
            "members", "/members",
            "issues", "/issues",
            "h2-console", "/h2-console"
        ));
        return response;
    }
}
