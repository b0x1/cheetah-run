package com.gepardec.event1024.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UserInteraction {
  public static int SIGNON = 0;
  public static int CLICK = 1;
  public static int LOGIN = 2;

  @Id @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @ManyToOne
  private User user;
  @Column
  private Date time;
  @Column
  private Integer type;
  @Column
  private String address;

  public UserInteraction() {}

  public UserInteraction(User user, Date time, Integer type, String address) {
    this.user = user;
    this.time = time;
    this.type = type;
    this.address = address;
  }

  public Integer getType() {
    return type;
  }

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSZ")
  public Date getTime() {
    return time;
  }

  public String getAddress() {
    return address;
  }
}
