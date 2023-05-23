package com.myorg.game_bj.service;

import com.myorg.game_bj.exception.GameException;
import com.myorg.game_bj.model.BetBox;
import com.myorg.game_bj.model.player.Player;
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
    private boolean inGame;

    public GameService() {
        this.inGame = false;
    }

    public void checkStart() throws GameException {
        if (!inGame) {
            throw new GameException(GameException.GAME_HAS_NOT_STARTED_YET);
        }
    }

    public boolean start() {
        this.inGame = true;
        return true;
    }

    public Card drawCard() throws GameException {
        checkStart();
        return this.blackjackService.draw();
    }

    public Player checkWinner(String player1, List<Card> deck1, String player2, List<Card> deck2) {
        return playerService.getPlayer(blackjackService.checkWinner(player1, deck1, player2, deck2));
    }

    public int SumCards(List<Card> deck) {
        return blackjackService.sumDeck(deck);
    }

    public void resetGame() {
        this.inGame = false;
        this.blackjackService.reset();
    }

    public void registryInitialBet(String bet) {
        this.blackjackService.setInitialBet(bet);
    }

    public List<Player> intoPlayer(Player newPlayer) throws GameException {
        return playerService.add(newPlayer);
    }

    public List<Player> listPlayers() {
        return playerService.getPlayers();
    }

    public Player registryABetBox(BetBox betBox, String username) throws GameException {
        checkStart();
        return playerService.addBetBox(betBox, username);
    }
}