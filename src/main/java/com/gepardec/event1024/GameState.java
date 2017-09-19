package com.gepardec.event1024;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GameState {
  protected static final int NUMBER_OF_STEPS = 32;

  public static final int PREPARE = 0;
  public static final int RUNNING = 1;
  public static final int FINISHED = 2;

  private int state;

  public GameState() {
    this.state = GameState.PREPARE;
  }

  public void setState(int flag) {
    this.state = flag;
  }

  public int getState() {
    return this.state;
  }
}
