package com.myorg.game_bj.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BetBox {
    private String id;
    private String amount;
    private String owner;
    private Map<String, Integer> tokens;
}
