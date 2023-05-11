package com.myorg.game_bj.service;

import com.myorg.game_bj.model.Player;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {
    @Getter
    private final List<Player> players;

    public PlayerService() {
        this.players = new ArrayList<>();
    }

    public List<Player> add(Player newPlayer) {
        players.add(newPlayer);
        return this.getPlayers();
    }
}
