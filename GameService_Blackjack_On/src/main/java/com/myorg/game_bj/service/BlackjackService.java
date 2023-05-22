package com.myorg.game_bj.service;

import com.myorg.game_bj.model.card.Card;
import com.myorg.game_bj.model.card.CardType;
import com.myorg.game_bj.model.card.Weight;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class BlackjackService {
    private final List<Card> deck;
    private final List<Integer> usedCards;
    private String initialBet;
    private final Random random;

    public BlackjackService() {
        this.usedCards = new ArrayList<>();
        this.deck = new ArrayList<>();
        this.random = new Random();
    }

    public Card draw() {
        int range = this.deck.size();
        int index = this.random.nextInt(range);

        while (!usedCards.contains(index)) {
            index = this.random.nextInt(range);
        }

        Card selectedCard = this.deck.remove(index);
        this.usedCards.add(index);

        return selectedCard;
    }

    public int sumDeck(List<Card> deck) {
        int sum = 0;

        List<Card> num = deck.stream().filter((Card card) -> {
            return !List.of(Weight.JACK.getValue(), Weight.QUEEN.getValue(), Weight.KING.getValue(), Weight.ACE.getValue())
                    .contains(card.getWeight());
        }).toList();
        List<Card> noNum = deck.stream().filter((Card card) -> {
            return List.of(Weight.JACK.getValue(), Weight.QUEEN.getValue(), Weight.KING.getValue(), Weight.ACE.getValue())
                    .contains(card.getWeight());
        }).toList();

        for (Card card: num) {
            sum += Integer.parseInt(card.getWeight());
        }
        for (Card card: noNum) {
            if (List.of("J", "Q", "K").contains(card.getWeight())) {
                sum += 10;
            } else if (card.getWeight().equals("A")) {
                if (sum <= 10) {
                    sum += 11;
                } else {
                    sum += 1;
                }
            }
        }

        return sum;
    }

    public String checkWinner(String player1, List<Card> deck1, String player2, List<Card> deck2) {
        int sum1 = sumDeck(deck1);
        int sum2 = sumDeck(deck2);

        return sum1 <= 21 && sum1 > sum2 ? player1 : player2;
    }

    public void setInitialBet(String bet) {
        this.initialBet = bet;
    }

    public void reset() {
        initDeck();
        this.usedCards.clear();
    }

    private void initDeck() {
        this.deck.addAll(List.of(
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
}
