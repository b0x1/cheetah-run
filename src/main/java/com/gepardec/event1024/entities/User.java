package com.gepardec.event1024.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
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

  @XmlElement(name = "fullName")
  public String getUsername() {
    return username;
  }

  @JsonIgnore
  public String getPassword() {
    return password;
  }


  @JsonBackReference
  public List<UserInteraction> getUserInteractions() {
    return userInteractions;
  }

  public int getNumberOfClicks() {
    int clicks = 0;
    if (userInteractions != null) {
      for (UserInteraction ui : userInteractions) {
        if (ui.getType().equals(UserInteraction.CLICK)) {
          clicks += 1;
        }
      }
    }
    return clicks;
  }
}
