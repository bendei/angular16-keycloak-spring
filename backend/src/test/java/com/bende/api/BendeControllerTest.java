package com.bende.api;

import api.model.KonnektorDTO;
import com.bende.persistence.model.Konnektor;
import com.bende.service.ApiError;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.Month;

import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

// https://rieckpil.de/spring-webtestclient-for-efficient-testing-of-your-rest-api/
// https://www.tabnine.com/code/java/classes/org.springframework.test.web.reactive.server.FluxExchangeResult
// Integration Test for Testing API Endpoint with real DB.

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql({"/test_data.sql"})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
public class BendeControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @Order(2)
    void shouldDeleteKonnektor() {
        this.webTestClient
                .delete()
                .uri("/api/konnektors/1")
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Void.class);
    }

    @Test
    @Order(1)
   // @Ignore
    void shouldReturnKonnektor() {
       FluxExchangeResult<Konnektor> resultBody = this.webTestClient
                .get()
                .uri("/api/konnektors/1", 42)
                .exchange()
                .expectStatus()
                .isEqualTo(HttpStatus.OK)
                .returnResult(Konnektor.class);

       Flux<Konnektor> konnFlux = resultBody.getResponseBody();
       Konnektor kon = konnFlux.blockFirst();

        Assertions.assertEquals(1L, kon.getId());
        Assertions.assertEquals("127.0.0.2", kon.getHostname());
    }

    @Test
    @Order(3)
    void shouldReturnAllKonnektors() {
        WebTestClient.ListBodySpec<Konnektor> resultLista =  this.webTestClient
                .get()
                .uri("/api/konnektors")
                .exchange()
                .expectStatus()
                .isOk()
               .expectBodyList(Konnektor.class);

        Assertions.assertFalse(resultLista.returnResult().getResponseBody().isEmpty());
    }

    @Test
    @Order(4)
   // @Ignore
    void shouldCreateAKonnektor() {
        FluxExchangeResult<Void> resultBody = this.webTestClient
                .post()
                .uri("/api/konnektors", 42)
               // .body(Mono.just(givenKonnektord()), KonnektorDTO.class)
                .syncBody(givenKonnektord())
                .header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .header(ACCEPT, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus()
                .isEqualTo(CREATED)
                .returnResult(Void.class);
    }

    @Test
    @Order(5)
    void shouldFailCreateAKonnektor_returns_apiError() {
        KonnektorDTO dto = givenKonnektord();
        dto.setHostName(null);
        FluxExchangeResult<ApiError> resultBody = this.webTestClient
                .post()
                .uri("/api/konnektors", 42)
                .body(Mono.just(dto), KonnektorDTO.class)
                .header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .header(ACCEPT, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus()
                .isEqualTo(HttpStatus.BAD_REQUEST)
                .returnResult(ApiError.class);

        ApiError apiError = resultBody.getResponseBody().blockFirst();
        Assertions.assertEquals("hostName: nem lehet null", apiError.getMessage());
    }



    private KonnektorDTO givenKonnektord() {
        KonnektorDTO konn = new KonnektorDTO();
        konn.setHostName("127.3.3.3");
        konn.setHardwareVersion("hw.1.1");
        konn.setFirmwareVersion(null);
        konn.setSerialNumber(null);
        konn.setActive(true);
        LocalDateTime aDateTime = LocalDateTime.of(2015, Month.JULY, 29, 19, 30, 40);
        konn.setCreated(aDateTime);
        return konn;
    }

}
