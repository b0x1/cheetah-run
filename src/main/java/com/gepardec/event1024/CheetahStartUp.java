package com.gepardec.event1024;

import com.gepardec.event1024.entities.User;
import com.gepardec.event1024.entities.UserInteraction;

import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.transaction.*;
import javax.ws.rs.core.Response;
import java.util.Calendar;

@WebListener
public class CheetahStartUp implements ServletContextListener {
  @Inject CheetahDAO dao;

  private User admin;

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      admin = dao.createAdmin();
//      testRun();
    } catch (NotSupportedException | SystemException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
      e.printStackTrace();
    }


  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {

  }

  private void testRun() {
    for (int i = 0; i < GameState.NUMBER_OF_STEPS; i++) {
      UserInteraction ui = new UserInteraction(admin,
          Calendar.getInstance().getTime(),
          UserInteraction.CLICK,
          "localhost");
      try {
        dao.persist(ui);
      } catch (SystemException | NotSupportedException | HeuristicRollbackException | HeuristicMixedException | RollbackException  e) {
        e.printStackTrace();
      }
    }
  }
}

