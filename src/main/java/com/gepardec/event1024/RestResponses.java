package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;

import javax.annotation.Resource;
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

  @PersistenceContext
  private EntityManager em;

  @Resource
  private UserTransaction userTransaction;

  @GET @Path("/player")
  @Produces("application/json")
  public User getPlayer()  {
    Principal p = httpServletRequest.getUserPrincipal();
    if (p == null) {
      return null;
    } else {
      return em.find(User.class, p.getName());
    }
  }

  @GET @Path("/players")
  @Produces("application/json")
  public List<User> getAllUsers() {
    TypedQuery<User> allQuery = em.createQuery("SELECT u FROM Users u", User.class);
    return allQuery.getResultList();
  }

  @POST @Path("/click")
  @Produces("application/json")
  public long doClick() {
    User player = em.find(User.class, httpServletRequest.getUserPrincipal().getName());
    if (player != null) {
      UserInteraction ui = new UserInteraction(getPlayer(),
          Calendar.getInstance().getTime(),
          UserInteraction.CLICK,
          httpServletRequest.getRemoteAddr());
      try {
        userTransaction.begin();
        em.persist(ui);
        userTransaction.commit();
      } catch (Exception e) {
        e.printStackTrace();
      }
      return player.getNumberOfClicks();
    } else {
      return 0;
    }

  }

  @GET @Path("/click/{number}")
  @Produces("application/json")
  public UserInteraction getClick(@PathParam("number") int number) {
    TypedQuery<UserInteraction> query = em.createQuery("SELECT u FROM UserInteraction u WHERE type = 1",
        UserInteraction.class);
    try {
      return query.getResultList().get(number);
    } catch (IndexOutOfBoundsException e) {
      return null;
    }
  }

  @GET @Path("/restart_the_game")
  @Produces("text/plain")
  public String cleanSlate() {
    try {
      userTransaction.begin();
      Query q1 = em.createQuery("DELETE FROM Users");
      Query q2 = em.createQuery("DELETE FROM UserInteraction");
      q2.executeUpdate();
      q1.executeUpdate();
      userTransaction.commit();
      httpServletRequest.logout();
      return "DB successfully cleaned";
    } catch (IllegalStateException | NotSupportedException | SystemException | RollbackException |
        HeuristicMixedException | HeuristicRollbackException e){
      e.printStackTrace();
      return "Error";
    } catch (ServletException e) {
      return "DB successfully cleaned, but error logging out.";
    }
  }
}
