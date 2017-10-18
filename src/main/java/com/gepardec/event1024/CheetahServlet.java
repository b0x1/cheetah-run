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
import java.security.Principal;

@WebServlet(name="game", urlPatterns={""})
public class CheetahServlet extends HttpServlet {

  @Inject private CheetahDAO dao;

  @Inject private GameState gameState;

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    User p = getPlayer(request);
    if (p == null) {
      try {
        p = dao.signonUser(request);
        request.login(p.getUsername(), p.getPassword());
        forwardToUI(request, response, p);
      } catch(ServletException e) {
        request.setAttribute("errorTitle", "Server-Fehler.");
        request.setAttribute("errorMessage", e.getMessage());
        response.setStatus(500);
        request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
        e.printStackTrace();
      } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException | SystemException e) {
        request.setAttribute("errorTitle", "Login-Fehler.");
        request.setAttribute("errorMessage", e.getMessage());
        response.setStatus(500);
        request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
        e.printStackTrace();
      }
    } else {
      forwardToUI(request, response, p);
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    User p = getPlayer(request);
    if (p == null) {
      request.getRequestDispatcher("WEB-INF/templates/login.ftl").forward(request, response);
    } else {
      forwardToUI(request, response, p);
    }
  }
  
  private User getPlayer(HttpServletRequest request)  {
    Principal p = request.getUserPrincipal();
    return p == null? null : dao.find(User.class, p.getName());
  }

  private void forwardToUI(HttpServletRequest request, HttpServletResponse response, User player)  throws ServletException, IOException {
    request.setAttribute("player", player.getUsername());
    request.setAttribute("clicks", player.getNumberOfClicks());
    request.getRequestDispatcher("WEB-INF/templates/ui.ftl").forward(request, response); 
  }
}
