FROM jboss/base-jdk:8

USER root
ADD cheetah-run-swarm.jar /opt/wildfly-swarm.jar
RUN chown jboss:jboss /opt/wildfly-swarm.jar

USER jboss
RUN mkdir ~/Desktop

EXPOSE 8080
CMD java -jar /opt/wildfly-swarm.jar
