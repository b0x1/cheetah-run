package com.gepardec.event1024.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Users")
public class User {
  @Id @Column(name="username")
  private String username;

  @Column(name="passwd")
  private String password;

  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "user")
  private List<UserInteraction> userInteractions;

  public User() {}

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public List<UserInteraction> getUserInteractions() {
    System.out.println(userInteractions);
    return userInteractions;
  }

  public int getNumberOfClicks() {
    int clicks = 0;
    for (UserInteraction ui : userInteractions) {
      if (ui.getType().equals(UserInteraction.CLICK)) {
        clicks += 1;
      }
    }

    return clicks;
  }
}
