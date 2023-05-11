package com.myorg.game_bj.controller;

import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.model.card.Card;
import com.myorg.game_bj.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/game")
public class GameController {
    @Autowired
    SimpMessagingTemplate message;
    @Autowired
    GameService service;

    @GetMapping("/player")
    public ResponseEntity<List<Player>> getUsers() {
        return new ResponseEntity<>(service.listPlayers(), HttpStatus.OK);
    }

    @PostMapping("/card")
    public ResponseEntity<Card> drawCard() {
        Card drawedCard = service.drawCard();
        message.convertAndSend("/topic/cards", drawedCard);
        return new ResponseEntity<>(drawedCard, HttpStatus.OK);
    }

    @PostMapping("/player")
    public ResponseEntity<List<Player>> addPlayer(@RequestBody Player newPlayer) {
        List<Player> players = service.intoPlayer(newPlayer);
        message.convertAndSend("/topic/players", players);
        return new ResponseEntity<>(players, HttpStatus.OK);
    }
}
