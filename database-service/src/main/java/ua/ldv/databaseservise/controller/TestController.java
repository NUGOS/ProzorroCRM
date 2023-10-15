package ua.ldv.databaseservise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/main")
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "TEST client");
        return ResponseEntity.ok(response);
    }
}
