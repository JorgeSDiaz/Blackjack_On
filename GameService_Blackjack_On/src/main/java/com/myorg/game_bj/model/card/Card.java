package com.myorg.game_bj.model.card;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Card {
    private String suit;
    private String weight;

    public Card(CardType cardType) {
        this.suit = cardType.getSuit().getLetter();
        this.weight = cardType.getWeight().getValue();
    }
}
