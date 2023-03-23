package ua.ldv.eurekaclient.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/calendar")
public class CalendarController {
    @GetMapping
    public ResponseEntity<Map<String, String>> calendar() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "calendar Eclient");
        return ResponseEntity.ok(response);
    }
}

