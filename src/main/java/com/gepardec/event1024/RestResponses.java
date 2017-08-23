package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
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
    UserInteraction ui = new UserInteraction(getPlayer(), Calendar.getInstance().getTime(), UserInteraction.CLICK, httpServletRequest.getRemoteAddr());

    try {
      userTransaction.begin();
      em.persist(ui);
      userTransaction.commit();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return getPlayer().getNumberOfClicks();
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
}
