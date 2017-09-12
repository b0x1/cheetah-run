package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;
import freemarker.ext.servlet.FreemarkerServlet;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.*;
import java.io.IOException;
import java.util.Calendar;

public class CheetahServlet extends FreemarkerServlet {

  @Resource
  private UserTransaction userTransaction;

  @PersistenceContext
  private EntityManager em;

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || em.find(User.class, request.getUserPrincipal().getName()) == null) {
      try {
        loginUser(request);
        request.getRequestDispatcher("ui.ftl").forward(request, response);
      } catch(ServletException ex) {
        System.out.println("Login Failed with a ServletException.." + ex.getMessage());
        response.sendRedirect("/");
      } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException | SystemException e) {
        response.setStatus(500);
        System.out.println(e.getMessage());
      }
    } else {
      request.getRequestDispatcher("ui.ftl").forward(request, response);
    }
  }

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || em.find(User.class, request.getUserPrincipal().getName()) == null) {
      request.getRequestDispatcher("/login.ftl").forward(request, response);
    } else {
      request.getRequestDispatcher("/ui.ftl").forward(request, response);
    }
  }

  private User loginUser(HttpServletRequest request) throws NotSupportedException, SystemException,
      HeuristicMixedException, HeuristicRollbackException, RollbackException, ServletException{

    String userName = request.getParameter("name").trim();
    String firmaName = request.getParameter("firma").trim();
    String address = request.getRemoteAddr();

    User user = em.find(User.class, userName);
    UserInteraction ui;

    if (user == null) {
      user = new User(userName, firmaName);
      userTransaction.begin();
      em.persist(user);
      userTransaction.commit();
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.SIGNON, address);
    } else if (user.getPassword().equals(firmaName)) {
      ui = new UserInteraction(user, Calendar.getInstance().getTime(), UserInteraction.LOGIN, address);
    } else {
      throw new SystemException("User does not match company name.");
    }

    userTransaction.begin();
    em.persist(ui);
    userTransaction.commit();

    request.login(user.getUsername(), user.getPassword());

    return user;
  }
}
