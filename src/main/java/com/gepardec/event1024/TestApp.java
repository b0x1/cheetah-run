package com.gepardec.event1024;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/")
public class TestApp {
  @GET
  @Path("/Miau")
  public String sayHello() {
    return "20";
  }
}
