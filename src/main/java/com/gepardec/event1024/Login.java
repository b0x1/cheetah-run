package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.*;
import java.io.IOException;
import java.util.Calendar;

@WebServlet(name="Login", urlPatterns={"", "/login"})
public class Login extends HttpServlet {

  @Resource
  private UserTransaction userTransaction;

  @PersistenceContext
  private EntityManager em;

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || em.find(User.class, request.getUserPrincipal().getName()) == null) {
      try {
        loginUser(request);

        response.sendRedirect("/ui.jsp");
      } catch(ServletException ex) {
        System.out.println("Login Failed with a ServletException.." + ex.getMessage());
        response.sendRedirect("/login");
      } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException | SystemException e) {
        response.setStatus(500);
        System.out.println(e.getMessage());
      }
    } else {
      response.sendRedirect("/ui.jsp");
    }
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || em.find(User.class, request.getUserPrincipal().getName()) == null) {
      request.getRequestDispatcher("/login.jsp").forward(request, response);
    } else {
      response.sendRedirect("/ui.jsp");
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
