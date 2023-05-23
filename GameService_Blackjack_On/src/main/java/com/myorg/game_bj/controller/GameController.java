package com.myorg.game_bj.controller;

import com.myorg.game_bj.exception.GameException;
import com.myorg.game_bj.model.BetBox;
import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.model.card.Card;
import com.myorg.game_bj.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.myorg.game_bj.util.Response.*;

@RestController
@RequestMapping("/v1/game")
public class GameController {
    @Autowired
    SimpMessagingTemplate message;
    @Autowired
    GameService service;


    @GetMapping("")
    public ResponseEntity<?> start(){
        boolean rta = this.service.start();
        message.convertAndSend("/topic/startgame", "OK");
        return new ResponseEntity<>("OK", HttpStatus.OK);

    }

    @GetMapping("/endInitialBet")
    public ResponseEntity<?> end(){
        message.convertAndSend("/topic/endinitialbet", "OK");
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }


    @GetMapping("/player")
    public ResponseEntity<List<Player>> getUsers() {
        return new ResponseEntity<>(this.service.listPlayers(), HttpStatus.OK);
    }

    @PostMapping("/player")
    public ResponseEntity<?> addPlayer(@RequestBody Player newPlayer) {
        try {
            List<Player> players = this.service.intoPlayer(newPlayer);
            message.convertAndSend("/topic/players", players);
            return new ResponseEntity<>(players, HttpStatus.OK);
        } catch (GameException e) {
            return new ResponseEntity<>(response("error",e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping("/card")
    public ResponseEntity<?> drawCard() {
        try {
            Card drawedCard = this.service.drawCard();
            message.convertAndSend("/topic/cards", drawedCard);
            return new ResponseEntity<>(drawedCard, HttpStatus.OK);
        } catch (GameException e) {
            return new ResponseEntity<>(response("error", e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping("/betBox/{username}")
    public ResponseEntity<?> betForABox(@RequestBody BetBox betBox, @PathVariable("username") String username) {
        try {
            Player playerBet = this.service.registryABetBox(betBox, username);
            message.convertAndSend("/topic/playerBetBox", playerBet);
            return new ResponseEntity<>(playerBet, HttpStatus.OK);
        } catch (GameException e) {
            return new ResponseEntity<>(response("error", e.getMessage()), HttpStatus.OK);
        }
    }

<<<<<<< HEAD
    @PostMapping("/bet/{bet}")
    public ResponseEntity<?> initialBet(@PathVariable("bet") String bet) {
        this.service.registryInitialBet(bet);
        return new ResponseEntity<>("{\"response\": \"Ok\"}", HttpStatus.OK);
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkDeck(@RequestBody List<Card> cards) {
        return new ResponseEntity<>(response("sum", Integer.toString(this.service.SumCards(cards))), HttpStatus.OK);
    }

    @GetMapping("/winner/{player1}/{player2}")
    public ResponseEntity<?> checkWinner(@PathVariable String player1, @RequestBody List<Card> deck1 ,
                                         @PathVariable String player2, @RequestBody List<Card> deck2) {
        return new ResponseEntity<>(service.checkWinner(player1, deck1, player2, deck2), HttpStatus.OK);
    }
}
=======


    
}
>>>>>>> 815c9b3a879965d14baf5e6907be767fe608652c
