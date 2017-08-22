package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import java.lang.annotation.Annotation;
import java.net.URI;
import java.util.*;

@Path("/")
public class RestResponses {

  @Context
  private HttpServletRequest httpServletRequest;

  @PersistenceContext
  private EntityManager em;

  @GET @Path("/credentials")
  @Produces("application/json")
  public String getCredentials()  {
    if (httpServletRequest.getUserPrincipal() == null) {
      return "{ \"error\": \"You are not logged in.\" }";
    } else {
      return "{ \"userName\": \"" + httpServletRequest.getUserPrincipal().getName() + "\"}";
    }
  }

  @GET @Path("/players")
  @Produces("application/json")
  public List<User> getAllUsers() {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<User> cq = cb.createQuery(User.class);
    Root<User> rootEntry = cq.from(User.class);
    CriteriaQuery<User> all = cq.select(rootEntry);
    TypedQuery<User> allQuery = em.createQuery(all);
    return allQuery.getResultList();
  }

  @GET @Path("/interactions")
  @Produces("application/json")
  public List<UserInteraction> getAllUserInteractions() {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<UserInteraction> cq = cb.createQuery(UserInteraction.class);
    Root<UserInteraction> rootEntry = cq.from(UserInteraction.class);
    CriteriaQuery<UserInteraction> all = cq.select(rootEntry);
    TypedQuery<UserInteraction> allQuery = em.createQuery(all);
    return allQuery.getResultList();
  }
}
