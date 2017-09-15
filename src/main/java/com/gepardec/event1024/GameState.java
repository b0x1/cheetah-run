package com.gepardec.event1024;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GameState {
  protected static final int NUMBER_OF_STEPS = 1024;

  private boolean running;

  public GameState() {
    this.running = false;
  }

  public void setRunning(boolean flag) {
    running = flag;
  }

  public boolean isRunning() {
    return running;
  }
}
