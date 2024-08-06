package it.valueson.portale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"it.valueson"})
public class PortaleBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortaleBeApplication.class, args);
	}

}
