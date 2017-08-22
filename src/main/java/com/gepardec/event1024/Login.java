package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.UserTransaction;
import java.io.IOException;

@WebServlet(name="Login", urlPatterns={"", "/login"})
public class Login extends HttpServlet {

  @Resource
  private UserTransaction userTransaction;

  @PersistenceContext
  private EntityManager em;

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null) {
      String userName = request.getParameter("name");
      String firmaName = request.getParameter("firma");
      User user = new User(userName, firmaName);
      try {
        userTransaction.begin();
        em.persist(user);
        userTransaction.commit();
      } catch (Exception e) {
        e.printStackTrace();
      }

      try {
        request.login(userName, firmaName);
        response.sendRedirect("/game.html");
      } catch(ServletException ex) {
        System.out.println("Login Failed with a ServletException.." + ex.getMessage());
        response.sendRedirect("/login");
      }

    } else {
      response.sendRedirect("/game.html");
    }
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null) {
      request.getRequestDispatcher("/login.html").forward(request, response);
    } else {
      response.sendRedirect("/game.html");
    }
  }
}
