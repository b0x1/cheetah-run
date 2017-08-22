package com.gepardec.event1024;


import com.gepardec.event1024.entities.User;
import org.hibernate.Session;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.NotSupportedException;
import javax.transaction.UserTransaction;


@WebServlet(name="LoginTest", urlPatterns={"/LoginTest"})
public class LoginTest extends HttpServlet {

  @Resource
  private UserTransaction userTransaction;

  @PersistenceContext
  private EntityManager em;

  /**
   * Processes requests for both HTTP <code>GET</code>
   *    and <code>POST</code> methods.
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  protected void service(HttpServletRequest request,
                                HttpServletResponse response)
      throws ServletException, IOException {

//    User user = new User("kitty", "meowmeow");
//    try {
//      userTransaction.begin();
//      em.persist(user);
//      userTransaction.commit();
//    } catch (Exception e) {
//      e.printStackTrace();
//    }

    User user = em.find(User.class, "kitty");


    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    try {
      String userName = user.getUsername();
      String password = user.getPassword();

      out.println("Before Login" + "<br><br>");
      out.println("IsUserInRole?.."
          + request.isUserInRole("javaee7user")+"<br>");
      out.println("getRemoteUser?.." + request.getRemoteUser()+"<br>");
      out.println("getUserPrincipal?.."
          + request.getUserPrincipal()+"<br>");
      out.println("getAuthType?.." + request.getAuthType()+"<br><br>");

      try {
        request.login(userName, password);
      } catch(ServletException ex) {
        out.println("Login Failed with a ServletException.."
            + ex.getMessage());
        return;
      }
      out.println("After Login..."+"<br><br>");
      out.println("IsUserInRole?.."
          + request.isUserInRole("javaee7user")+"<br>");
      out.println("getRemoteUser?.." + request.getRemoteUser()+"<br>");
      out.println("getUserPrincipal?.."
          + request.getUserPrincipal()+"<br>");
      out.println("getAuthType?.." + request.getAuthType()+"<br><br>");

      request.logout();
      out.println("After Logout..."+"<br><br>");
      out.println("IsUserInRole?.."
          + request.isUserInRole("javaee7user")+"<br>");
      out.println("getRemoteUser?.." + request.getRemoteUser()+"<br>");
      out.println("getUserPrincipal?.."
          + request.getUserPrincipal()+"<br>");
      out.println("getAuthType?.." + request.getAuthType()+"<br>");
      out.println(request.getRemoteAddr());
    } finally {
      out.close();
    }
  }
}