package com.myorg.game_bj.model.card;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@NoArgsConstructor
@Getter
public class Card {
    private String suit, weight;

    public Card(CardType cardType) {
        this.suit = cardType.getSuit().getLetter();
        this.weight = cardType.getWeight().getValue();
    }
}
