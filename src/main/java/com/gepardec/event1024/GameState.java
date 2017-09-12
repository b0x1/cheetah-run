package com.gepardec.event1024;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GameState {
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
