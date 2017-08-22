package com.gepardec.event1024;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

@Path("/")
public class RestResponses {

  @Context
  private HttpServletRequest httpServletRequest;

  @GET @Path("/credentials")
  @Produces("application/json")
  public String getCredentials()  {
    if (httpServletRequest.getUserPrincipal() == null) {
      return "{ \"error\": \"You are not logged in.\" }";
    } else {
      return "{ \"User\": \"" + httpServletRequest.getUserPrincipal().getName() + "\"}";
    }
  }
}
