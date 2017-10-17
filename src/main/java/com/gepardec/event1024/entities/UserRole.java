package com.gepardec.event1024.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UserRole {
  public static final String GUEST = "Guest";
  public static final String ADMINISTRATOR = "Administrator";

  @Id
  @Column
  private String username;

  @Column
  private String userRoles;

  public UserRole(String username, String userRoles) {
    this.username = username;
    this.userRoles = userRoles;
  }
}
