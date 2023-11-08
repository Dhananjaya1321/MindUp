package lk.mindup;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.support.ManagedMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class WebAppInitializer {
    public static void main(String[] args) {
        SpringApplication.run(WebAppInitializer.class,args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
