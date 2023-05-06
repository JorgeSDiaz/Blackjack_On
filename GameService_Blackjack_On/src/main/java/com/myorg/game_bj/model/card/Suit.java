package com.myorg.game_bj.model.card;

import lombok.Getter;

@Getter
public enum Suit {
    CLUBS("C"),
    DIAMONDS("D"),
    HEARTS("H"),
    SPADES("S");

    private final String letter;

    private Suit(String letter) {
        this.letter = letter;
    }

    @Override
    public String toString() {
        return this.letter;
    }
}
