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
import javax.transaction.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name="Login", urlPatterns={"", "/login"})
public class Login extends HttpServlet {

  @Resource
  private UserTransaction userTransaction;

  @PersistenceContext
  private EntityManager em;

  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null) {
      PrintWriter out = response.getWriter();
      try {
        User user = loginUser(request.getParameter("name"), request.getParameter("firma"));
        request.login(user.getUsername(), user.getPassword());
        response.sendRedirect("/ui.html");
      } catch(ServletException ex) {
        System.out.println("Login Failed with a ServletException.." + ex.getMessage());
        response.sendRedirect("/login");
      } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException e) {
        response.setStatus(500);
        out.println("Cannot commit transaction.");
      } catch ( NotSupportedException | SystemException e) {
        response.setStatus(500);
        out.println("Cannot begin transaction");
      }

    } else {
      response.sendRedirect("/ui.html");
    }
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null) {
      request.getRequestDispatcher("/login.html").forward(request, response);
    } else {
      response.sendRedirect("/ui.html");
    }
  }

  private User loginUser(String userName, String firmaName) throws NotSupportedException, SystemException, HeuristicMixedException, HeuristicRollbackException, RollbackException{
    User user = new User(userName, firmaName);

    userTransaction.begin();
    em.persist(user);
    userTransaction.commit();

    return user;
  }
}
