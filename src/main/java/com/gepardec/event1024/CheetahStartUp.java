package com.gepardec.event1024;

import com.gepardec.event1024.entities.UserRole;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebListener;
import javax.transaction.*;
import java.util.Set;

@WebListener
public class CheetahStartUp implements ServletContextListener {
  @Inject CheetahDAO dao;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      dao.loginUser("Erhard", "Gepardec", UserRole.ADMINISTRATOR, null);
    } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException
        | SystemException | ServletException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {

  }
}

