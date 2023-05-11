package com.myorg.game_bj.service;

import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.model.card.Card;
import com.myorg.game_bj.model.card.CardType;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    @Autowired
    private PlayerService playerService;
    @Autowired
    private BlackjackService blackjackService;

    public Card drawCard() {
        return this.blackjackService.draw();
    }

    public void resetDeck() {
        this.blackjackService.reset();
    }

    public List<Player> intoPlayer(Player newPlayer) {
        return playerService.add(newPlayer);
    }

    public List<Player> listPlayers() {
        return playerService.getPlayers();
    }
}
