package com.myorg.game_bj.service;

import com.myorg.game_bj.model.Player;
import com.myorg.game_bj.model.card.Card;
import com.myorg.game_bj.model.card.CardType;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    private List<Card> deck;
    private final List<Card> usedCards;
    @Getter
    private List<Player> players;

    public GameService() {
        players = new ArrayList<>();
        usedCards = new ArrayList<>();
        deck = new ArrayList<>();
        deck.addAll(List.of(
                new Card(CardType.TWO_OF_CLUBS),
                new Card(CardType.TWO_OF_DIAMONDS),
                new Card(CardType.TWO_OF_HEARTS),
                new Card(CardType.TWO_OF_SPADES),

                new Card(CardType.THREE_OF_CLUBS),
                new Card(CardType.THREE_OF_DIAMONDS),
                new Card(CardType.THREE_OF_HEARTS),
                new Card(CardType.THREE_OF_SPADES),

                new Card(CardType.FOUR_OF_CLUBS),
                new Card(CardType.FOUR_OF_DIAMONDS),
                new Card(CardType.FOUR_OF_HEARTS),
                new Card(CardType.FOUR_OF_SPADES),

                new Card(CardType.FIVE_OF_CLUBS),
                new Card(CardType.FIVE_OF_DIAMONDS),
                new Card(CardType.FIVE_OF_HEARTS),
                new Card(CardType.FIVE_OF_SPADES),

                new Card(CardType.SIX_OF_CLUBS),
                new Card(CardType.SIX_OF_DIAMONDS),
                new Card(CardType.SIX_OF_HEARTS),
                new Card(CardType.SIX_OF_SPADES),

                new Card(CardType.SEVEN_OF_CLUBS),
                new Card(CardType.SEVEN_OF_DIAMONDS),
                new Card(CardType.SEVEN_OF_HEARTS),
                new Card(CardType.SEVEN_OF_SPADES),

                new Card(CardType.EIGHT_OF_CLUBS),
                new Card(CardType.EIGHT_OF_DIAMONDS),
                new Card(CardType.EIGHT_OF_HEARTS),
                new Card(CardType.EIGHT_OF_SPADES),

                new Card(CardType.NINE_OF_CLUBS),
                new Card(CardType.NINE_OF_DIAMONDS),
                new Card(CardType.NINE_OF_HEARTS),
                new Card(CardType.NINE_OF_SPADES),

                new Card(CardType.TEN_OF_CLUBS),
                new Card(CardType.TEN_OF_DIAMONDS),
                new Card(CardType.TEN_OF_HEARTS),
                new Card(CardType.TEN_OF_SPADES),

                new Card(CardType.JACK_OF_CLUBS),
                new Card(CardType.JACK_OF_DIAMONDS),
                new Card(CardType.JACK_OF_HEARTS),
                new Card(CardType.JACK_OF_SPADES),

                new Card(CardType.QUEEN_OF_CLUBS),
                new Card(CardType.QUEEN_OF_DIAMONDS),
                new Card(CardType.QUEEN_OF_HEARTS),
                new Card(CardType.QUEEN_OF_SPADES),

                new Card(CardType.KING_OF_CLUBS),
                new Card(CardType.KING_OF_DIAMONDS),
                new Card(CardType.KING_OF_HEARTS),
                new Card(CardType.KING_OF_SPADES),

                new Card(CardType.ACE_OF_CLUBS),
                new Card(CardType.ACE_OF_DIAMONDS),
                new Card(CardType.ACE_OF_HEARTS),
                new Card(CardType.ACE_OF_SPADES)
        ));
    }

    /*

     */
    public Card draw() {
        int range = deck.size();
        int index = new Random().nextInt(range);

        Card selectedCard = deck.remove(index);

        this.usedCards.add(selectedCard);

        return selectedCard;
    }

    public List<List<Card>> resetDeck() {
        this.deck = usedCards;
        this.usedCards.clear();

        return List.of(deck, usedCards);
    }

    public List<Player> intoPlayer(Player newPlayer) {
        players.add(newPlayer);

        return players;
    }

}
