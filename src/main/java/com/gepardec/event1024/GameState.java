package com.gepardec.event1024;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GameState {
  protected static final int NUMBER_OF_STEPS = 1024;

  private boolean gameStarted;

  public GameState() {
    this.gameStarted = false;
  }

  public void setGameStarted(boolean flag) {
    gameStarted = flag;
  }

  public boolean isGameStarted() {
    return gameStarted;
  }
}
