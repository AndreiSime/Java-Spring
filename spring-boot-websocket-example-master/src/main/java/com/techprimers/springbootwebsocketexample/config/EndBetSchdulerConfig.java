package com.techprimers.springbootwebsocketexample.config;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.techprimers.springbootwebsocketexample.model.UserResponse;

@EnableScheduling
@Configuration
public class EndBetSchdulerConfig {

    @Autowired
    SimpMessagingTemplate template;
   
    @Scheduled(fixedRate = 10000 , initialDelay=9800)
    
    public void sendAdhocMessages() {
    	
        template.convertAndSend("/topic/user", new UserResponse("Finish betting !"));
    }
   
}
