package com.myorg.game_bj.service;

import com.myorg.game_bj.model.BetBox;
import com.myorg.game_bj.model.Player;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PlayerService {
    private ConcurrentHashMap<String, Player> players;

    public PlayerService() {
        this.players = new ConcurrentHashMap<>();
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

        ownerBox.get(0).setBetBox(betBox);

        return players.get(username);
    }
}
