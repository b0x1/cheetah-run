package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;
import com.gepardec.event1024.entities.UserRole;

import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.*;
import java.util.Calendar;
import java.util.List;

@ApplicationScoped
public class CheetahDAO {
  @PersistenceContext
  private EntityManager em;

  @Resource
  private UserTransaction userTransaction;

  public <T> T find(Class<T> clazz, Object o) {
    return em.find(clazz, o);
  }

  public User signonUser(HttpServletRequest request) throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException {

    String name = request.getParameter("firstName").trim() + " " + request.getParameter("lastName").trim();
    String address = request.getRemoteAddr();

    return signonUser(name, null, address);
  }

  public User signonUser(String name, String role, String address) throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException {
    if (role == null) role = UserRole.GUEST;
    if (address == null) address = "localhost";

    User user = em.find(User.class, name);
    UserInteraction ui;

    if (user == null) {
      user = new User(name, "");
      userTransaction.begin();
      em.persist(user);
      em.persist(new UserRole(name, role));
      userTransaction.commit();
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.SIGNON, address);
    } else {
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.LOGIN, address);
    }

    userTransaction.begin();
    em.persist(ui);
    userTransaction.commit();

    return user;
  }

  public User createAdmin() throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException {
    return signonUser("Erhard Siegl",  UserRole.ADMINISTRATOR, null);
  }


  public <T> List<T> getResultList(String queryString, Class<T> clazz) {
    TypedQuery<T> query = em.createQuery(queryString, clazz);
    return query.getResultList();
  }

  public <T> T getResult(String queryString, Class<T> clazz) {
    TypedQuery<T> query = em.createQuery(queryString, clazz);
    return query.getSingleResult();
  }

  public void persist(Object o) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
    userTransaction.begin();
    em.persist(o);
    userTransaction.commit();
  }

  public void executeQueries(String[] queries) throws NotSupportedException, SystemException,
      RollbackException, HeuristicMixedException, HeuristicRollbackException {
    userTransaction.begin();
    for (String s : queries) {
      Query q = em.createQuery(s);
      q.executeUpdate();
    }
    userTransaction.commit();
  }

  public void cleanDB() throws NotSupportedException, SystemException,
      RollbackException, HeuristicMixedException, HeuristicRollbackException {
    executeQueries(new String[]{"DELETE FROM UserInteraction", "DELETE FROM UserRole", "DELETE FROM User"} );
    createAdmin();
  }
}
