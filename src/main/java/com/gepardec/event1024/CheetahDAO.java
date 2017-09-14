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

    String userName = request.getParameter("name").trim();
    String firmaName = request.getParameter("firma").trim();
    String address = request.getRemoteAddr();

    User user = signonUser(userName, firmaName, null, address);

    return user;
  }

  public User signonUser(String userName, String firmaName, String role, String address) throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException {
    if (role == null) role = UserRole.GUEST;
    if (address == null) address = "localhost";

    User user = em.find(User.class, userName);
    UserInteraction ui;

    if (user == null) {
      user = new User(userName, firmaName);
      userTransaction.begin();
      em.persist(user);
      em.persist(new UserRole(userName, role));
      userTransaction.commit();
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.SIGNON, address);
    } else if (user.getPassword().equals(firmaName)) {
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.LOGIN, address);
    } else {
      throw new SystemException("Spieler ist mit einem anderen Firmennamen eingeloggt.");
    }

    userTransaction.begin();
    em.persist(ui);
    userTransaction.commit();

    return user;
  }

  public void createAdmin() throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException {
    signonUser("Erhard", "Gepardec", UserRole.ADMINISTRATOR, null);
  }


  public <T> List<T> getResultList(String queryString, Class<T> clazz) {
    TypedQuery<T> query = em.createQuery(queryString, clazz);
    return query.getResultList();
  }

  public <T> T getResult(String queryString, Class<T> clazz) {
    TypedQuery<T> query = em.createQuery(queryString, clazz);
    return query.getSingleResult();
  }

  public void persist(Object o) {
    try {
      userTransaction.begin();
      em.persist(o);
      userTransaction.commit();
    } catch (Exception e) {
      e.printStackTrace();
    }
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
    executeQueries(new String[]{"DELETE FROM UserInteraction", "DELETE FROM UserRoles", "DELETE FROM Users"} );
    createAdmin();
  }
}
