package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;
import com.gepardec.event1024.entities.UserRole;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.*;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.*;

@Path("/")
public class RestResponses {

  @Context
  private HttpServletRequest httpServletRequest;

  @Inject
  private GameState gameState;

  @Inject
  private CheetahDAO dao;


  @GET @Path("/players")
  @Produces("application/json")
  public List<User> getAllUsers() {
    return dao.getResultList("SELECT u FROM Users u", User.class);
  }

  @POST @Path("/click")
  @Produces("text/plain")
  public Response doClick() {
    User player = dao.find(User.class, httpServletRequest.getUserPrincipal().getName());
    if (player != null && getNumberOfClicks() < GameState.NUMBER_OF_STEPS) {
        UserInteraction ui = new UserInteraction(player,
            Calendar.getInstance().getTime(),
            UserInteraction.CLICK,
            httpServletRequest.getRemoteAddr());
        dao.persist(ui);
        if (getNumberOfClicks() >= GameState.NUMBER_OF_STEPS) gameState.setRunning(false);
        return Response.ok(player.getNumberOfClicks() + 1).build();
    } else {
      gameState.setRunning(false);
      return Response.noContent().build();
    }
  }

  private long getNumberOfClicks() {
    return dao.getResult("SELECT COUNT(u) FROM UserInteraction u WHERE type = " + UserInteraction.CLICK, Long.class);
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
  public Response cleanSlate() {
    try {
      dao.cleanDB();
      httpServletRequest.logout();
      gameState.setRunning(false);
      return Response.ok("DB successfully cleaned").build();
    } catch (ServletException e) {
      return Response.serverError().entity("DB successfully cleaned, but error logging out.").build();
    } catch (NotSupportedException | SystemException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
      return Response.serverError().entity(e.getMessage()).build();
    }
  }

  @RolesAllowed(UserRole.ADMINISTRATOR)
  @GET @Path("/start_the_game")
  @Produces("text/plain")
  public String startGame() {
    gameState.setRunning(true);
    return "Spiel gestartet";
  }

  @GET @Path("game_running")
  @Produces("text/plain")
  public boolean isGameRunning() {
    return gameState.isRunning();
  }

  @GET @Path("logout")
  @Produces("text/plain")
  public Response logout() {
    try {
      httpServletRequest.logout();
      return Response.ok("Erfolgreich ausgeloggt").build();
    } catch (ServletException e) {
      return Response.serverError().entity("Serverfehler: " + e.getMessage()).build();
    }
  }
}

