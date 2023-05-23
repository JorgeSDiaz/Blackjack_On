package com.myorg.game_bj.service;

import com.myorg.game_bj.model.BetBox;
import com.myorg.game_bj.model.player.Player;
import com.myorg.game_bj.model.player.PlayerStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PlayerService {
    private ConcurrentHashMap<String, Player> players;
    private Player currentPlayer;
    private List<String> order;

    public PlayerService() {
        this.players = new ConcurrentHashMap<>();
        this.currentPlayer = new Player();
        this.order = new ArrayList<>();
    }

    public Player round() {
        nextPLayer();
        return getCurrentPlayer();
    }

    public void setCurrentPlayer(Player currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public Player getCurrentPlayer() {
        return this.currentPlayer;
    }

    public void nextPLayer() {
        this.currentPlayer.setStatus(PlayerStatus.WAITING);

        setCurrentPlayer(
                this.players.get(
                        this.order.get(
                        (this.order.indexOf(this.currentPlayer.getUsername()) + 1) % this.order.size()
                        )
                )
        );

        this.currentPlayer.setStatus(PlayerStatus.PLAYING);
    }

    public void setOrder(List<String> order) {
        this.order = order;
        setCurrentPlayer(
                this.players.get(
                        this.order.get(0)
                )
        );
    }

    public List<Player> getPlayers() {
        List<Player> playerList = new ArrayList<>();
        for (Map.Entry<String, Player> entry: players.entrySet()){
            playerList.add(entry.getValue());
        }

        return playerList;
    }
    public Player getPlayer(String username) {
        return players.get(username);
    }

    public List<Player> add(Player newPlayer) {
        players.put(newPlayer.getUsername(), newPlayer);
        return getPlayers();
    }

    public Player addBetBox(BetBox betBox, String username) {
        List<Player> ownerBox = getPlayers().stream().filter(p -> p.getBetBox().getOwner() != null).toList();
        if (!ownerBox.isEmpty()) {
            // Change: Throw exception bet box with owner
            return new Player();
        }

        players.get(username).setBetBox(betBox);

        return players.get(username);
    }
}

   
