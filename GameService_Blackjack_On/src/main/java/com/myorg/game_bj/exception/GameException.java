package com.myorg.game_bj.exception;

public class GameException extends Exception{
    public static final String GAME_HAS_NOT_STARTED_YET = "Waiting for the croupier to start the game";
    public static final String ONLY_BET = "You can only bet for a one number";

    public GameException(String message){
        super(message);
    }
}
