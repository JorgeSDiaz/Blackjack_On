package com.myorg.game_bj.model.player;

import lombok.Getter;

@Getter
public enum PlayerStatus {
    PLANT("PLANT"),
    FOLD("FOLD"),
    PLAYING("PLAYING"),
    WAITING("WAITING");

    private String type;

    private PlayerStatus(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return this.type;
    }
}
