package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.*;
import java.io.IOException;

@WebServlet(name="game", urlPatterns={""})
public class CheetahServlet extends HttpServlet {
  protected static final int NUMBER_OF_STEPS = 1024;

  @Inject
  private CheetahDAO dao;

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || dao.find(User.class, request.getUserPrincipal().getName()) == null) {
      try {
        User user = dao.signonUser(request);
        request.login(user.getUsername(), user.getPassword());
        request.getRequestDispatcher("WEB-INF/templates/ui.ftl").forward(request, response);
      } catch(ServletException e) {
        request.setAttribute("errorTitle", "Server-Fehler.");
        request.setAttribute("errorMessage", e.getMessage());
        response.setStatus(500);
        request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
      } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException | SystemException e) {
        request.setAttribute("errorTitle", "Login-Fehler.");
        request.setAttribute("errorMessage", e.getMessage());
        response.setStatus(500);
        request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
        System.out.println(e.getMessage());
      }
    } else {
      request.getRequestDispatcher("WEB-INF/templates/ui.ftl").forward(request, response);
    }
  }

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    if (request.getUserPrincipal() == null || dao.find(User.class, request.getUserPrincipal().getName()) == null) {
      request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
    } else {
      request.getRequestDispatcher("WEB-INF/templates/ui.ftl").forward(request, response);
    }
  }

}
