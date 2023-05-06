package com.jucajo.login.controller;

import com.jucajo.login.model.User;
import com.jucajo.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService service;

    @GetMapping("/")
    public ResponseEntity<?> getUsers() {
        return new ResponseEntity<>(service.list(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> saveUSer(@RequestBody User newUser) {
        return new ResponseEntity<>(service.add(newUser), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return new ResponseEntity<>(service.login(user), HttpStatus.OK);
    }

}