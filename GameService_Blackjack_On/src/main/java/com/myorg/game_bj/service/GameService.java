package com.myorg.game_bj.service;

import com.myorg.game_bj.model.BetBox;
import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.model.card.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void registryInitialBet(String bet) {
        this.blackjackService.setInitialBet(bet);
    }

    public List<Player> intoPlayer(Player newPlayer) {
        return playerService.add(newPlayer);
    }

    public List<Player> listPlayers() {
        return playerService.getPlayers();
    }

    public Player registryABetBox(BetBox betBox, String username) {
        return playerService.addBetBox(betBox, username);
    }
}
