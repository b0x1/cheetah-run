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
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
//    CriteriaBuilder cb = em.getCriteriaBuilder();
//    CriteriaQuery<User> cq = cb.createQuery(User.class);
//    Root<User> rootEntry = cq.from(User.class);
//    CriteriaQuery<User> all = cq.select(rootEntry);
//    TypedQuery<User> allQuery = em.createQuery(all);
    TypedQuery<User> allQuery = em.createQuery("SELECT u FROM Users u", User.class);
    return allQuery.getResultList();
  }

  @POST @Path("/click")
  @Produces("text/plain")
  public int doClick() {
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

  @GET @Path("/click")
  @Produces("text/plain")
  public long getClicks() {
    TypedQuery<Long> query = em.createQuery("SELECT COUNT(*) FROM UserInteraction WHERE type = 1", Long.class);
    return query.getSingleResult();
  }
}
