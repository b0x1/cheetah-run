package com.gepardec.event1024;

import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.transaction.*;

@WebListener
public class CheetahStartUp implements ServletContextListener {
  @Inject CheetahDAO dao;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      dao.createAdmin();
    } catch (NotSupportedException | SystemException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {

  }
}

