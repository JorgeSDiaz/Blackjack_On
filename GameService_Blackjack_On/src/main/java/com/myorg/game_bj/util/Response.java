package com.myorg.game_bj.util;

public class Response {
    public static String response(String key, String message) {
        return "{\""+ key +"\": \"" + message + "\"}";
    }
}
