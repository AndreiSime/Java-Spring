package com.techprimers.springbootwebsocketexample.config;

import com.techprimers.springbootwebsocketexample.model.UserResponse;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
public class SchedulerConfig {

    @Autowired
    SimpMessagingTemplate template;
    Random r =new Random();
    
    @Scheduled(fixedRate = 10000, initialDelay = 10000)
    public void sendAdhocMessages() {
    	
        template.convertAndSend("/topic/user", new UserResponse("Winning numer : " + r.nextInt(37)));
    }
   
}
