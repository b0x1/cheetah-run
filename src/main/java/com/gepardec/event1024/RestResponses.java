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
    return dao.getResultList("SELECT u FROM User u", User.class);
  }

  @POST @Path("/click")
  @Produces("text/plain")
  public Response doClick() {
    User player = dao.find(User.class, httpServletRequest.getUserPrincipal().getName());
    if (player != null) {
      if (getNumberOfClicks() < GameState.NUMBER_OF_STEPS) {
        UserInteraction ui = new UserInteraction(player,
            Calendar.getInstance().getTime(),
            UserInteraction.CLICK,
            httpServletRequest.getRemoteAddr());
        try {
          dao.persist(ui);
        } catch (SystemException | NotSupportedException | HeuristicRollbackException | HeuristicMixedException | RollbackException  e) {
          return Response.serverError().entity(e.getMessage()).build();
        }
        if (getNumberOfClicks() >= GameState.NUMBER_OF_STEPS) gameState.setState(GameState.FINISHED);
        return Response.ok(player.getNumberOfClicks() + 1).build();
      } else {
        gameState.setState(GameState.FINISHED);
        return Response.noContent().build();
      }
    } else return Response.noContent().build();
  }

  private long getNumberOfClicks() {
    return dao.getResult("SELECT COUNT(u) FROM UserInteraction u WHERE type = " + UserInteraction.CLICK, Long.class);
  }

  @GET @Path("/clicks")
  @Produces("application/json")
  public List<UserInteraction> getAllClicks() {
    return dao.getResultList("SELECT u FROM UserInteraction u WHERE type = " + UserInteraction.CLICK,
        UserInteraction.class);
  }

  @GET @Path("/interactions")
  @Produces("application/json")
  public List<UserInteraction> getAllUserInteractions() {
    return dao.getResultList("SELECT u FROM UserInteraction u", UserInteraction.class);
  }


  @GET @Path("/click/{number}")
  @Produces("application/json")
  public UserInteraction getClick(@PathParam("number") int number) {
    try {
      return getAllClicks().get(number);
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
      gameState.setState(GameState.PREPARE);
      return Response.ok("DB successfully cleaned").build();
    } catch (NotSupportedException | SystemException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
      return Response.serverError().entity(e.getMessage()).build();
    }
  }

  @RolesAllowed(UserRole.ADMINISTRATOR)
  @GET @Path("/start_the_game")
  @Produces("text/plain")
  public String startGame() {
    gameState.setState(GameState.RUNNING);
    return "Spiel gestartet";
  }

  @GET @Path("game_state")
  @Produces("text/plain")
  public int getGameState() {
    return gameState.getState();
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

