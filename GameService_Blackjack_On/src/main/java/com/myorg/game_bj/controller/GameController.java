package com.myorg.game_bj.controller;

import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/game")
public class GameController {
    @Autowired
    GameService service;

    @GetMapping("/player")
    public ResponseEntity<?> getUsers() {
        return new ResponseEntity<>(service.getPlayers(), HttpStatus.OK);
    }

    @PostMapping("/card")
    public ResponseEntity<?> drawCard() {
        return new ResponseEntity<>(service.draw(), HttpStatus.OK);
    }

    @PostMapping("/player")
    public ResponseEntity<?> addPlayer(@RequestBody Player newPlayer) {
        return new ResponseEntity<>(service.intoPlayer(newPlayer), HttpStatus.OK);
    }
}
