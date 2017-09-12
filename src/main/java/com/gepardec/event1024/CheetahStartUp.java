package com.gepardec.event1024;

import com.gepardec.event1024.entities.UserRole;

import javax.inject.Inject;
import javax.servlet.ServletContainerInitializer;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.transaction.*;
import java.util.Set;

public class CheetahStartUp implements ServletContainerInitializer{
  @Inject CheetahDAO dao;

  @Override
  public void onStartup(Set<Class<?>> set, ServletContext servletContext) throws ServletException {
    try {
      dao.loginUser("Erhard", "Gepardec", UserRole.ADMINISTRATOR, null);
    } catch (HeuristicMixedException | HeuristicRollbackException | RollbackException | NotSupportedException | SystemException e) {
      System.out.println(e.getMessage());
    }
  }
}

