package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;
import com.gepardec.event1024.entities.UserRole;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.*;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.security.Principal;
import java.util.*;

@Path("/")
public class RestResponses {

  @Context
  private HttpServletRequest httpServletRequest;

  @Inject
  private GameState gameState;

  @Inject
  private CheetahDAO dao;


  @GET @Path("/player")
  @Produces("application/json")
  public User getPlayer()  {
    Principal p = httpServletRequest.getUserPrincipal();
    if (p == null) {
      return null;
    } else {
      return dao.find(User.class, p.getName());
    }
  }

  @GET @Path("/players")
  @Produces("application/json")
  public List<User> getAllUsers() {
    return dao.getResultList("SELECT u FROM Users u", User.class);
  }

  @POST @Path("/click")
  public long doClick() {
    User player = dao.find(User.class, httpServletRequest.getUserPrincipal().getName());
    if (player != null && getClicks().size() <= CheetahServlet.NUMBER_OF_STEPS) {
      UserInteraction ui = new UserInteraction(getPlayer(),
          Calendar.getInstance().getTime(),
          UserInteraction.CLICK,
          httpServletRequest.getRemoteAddr());
      dao.persist(ui);
      return player.getNumberOfClicks();
    } else {
      return -1;
    }

  }

  @GET @Path("/clicks")
  @Produces("application/json")
  public List<UserInteraction> getClicks() {
    return dao.getResultList("SELECT u FROM UserInteraction u WHERE type = " + UserInteraction.CLICK,
        UserInteraction.class);
  }

  @GET @Path("/click/{number}")
  @Produces("application/json")
  public UserInteraction getClick(@PathParam("number") int number) {
    try {
      return getClicks().get(number);
    } catch (IndexOutOfBoundsException e) {
      return null;
    }
  }

  @RolesAllowed(UserRole.ADMINISTRATOR)
  @GET @Path("/restart_the_game")
  @Produces("text/plain")
  public String cleanSlate() {
    try {
      httpServletRequest.logout();
      dao.executeQueries(new String[]{"DELETE FROM UserInteraction", "DELETE FROM Users"} );
      return "DB successfully cleaned";
    } catch (ServletException e) {
      return "DB successfully cleaned, but error logging out.";
    }
  }

  @RolesAllowed(UserRole.ADMINISTRATOR)
  @GET @Path("/start_the_game")
  @Produces("text/plain")
  public String startGame() {
    gameState.setGameStarted(true);
    return "Spiel gestartet";
  }

  @GET @Path("game_started")
  @Produces("text/plain")
  public Response isGameStarted() {
    if (gameState.isGameStarted()) return Response.status(Response.Status.OK).entity("Game started").build();
    else return Response.status(Response.Status.NO_CONTENT).entity("Please be patient.").build();
  }

  @GET @Path("logout")
  @Produces("text/plain")
  public String logout() {
    try {
      httpServletRequest.logout();
      return "Erfolgreich ausgeloggt";
    } catch (ServletException e) {
      return "Serverfehler.";
    }
  }
}

