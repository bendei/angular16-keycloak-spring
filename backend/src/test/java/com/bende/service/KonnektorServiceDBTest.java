package com.bende.service;

import com.bende.Application;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@Transactional  // rolls back transaction after each Test -> no after cleanup is necessary (like deleteing entity after creating one in Test)
//@DataJpaTest
@SpringBootTest(classes = {Application.class, KonnektorService.class, KonnektorRepository.class})
public class KonnektorServiceDBTest {

    private static final String HOSTNAME = "127.0.0.1";
    @Mock
    Konnektor konnektor;
    @Autowired
    KonnektorRepository konnektorRepository;
    @Autowired
    KonnektorService konnektorService;

    @Test
    void getKonnektor_returnsAKonnektor() {
        Konnektor konnektor = konnektorService.getKonnektor(1L);
        Assertions.assertNotNull(konnektor);
        Assertions.assertEquals(konnektor.getHostname(), HOSTNAME);
    }

    @Test
    void getKonnektor_shouldThrowException() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(11111L));
    }

    @Test
    void createKonnektor_shouldSuccessful() {
        givenAnUnsavedKonnektor();
        konnektorService.createKonnektor(konnektor);
        thenNewKonnektorSaved();
    }
    @Test
    @Sql({"/test_data.sql"})
    void getAllKonnektors() {
        List<Konnektor> lista = konnektorService.getAllKonnektors(null, null, null, null);
        Assertions.assertTrue(!lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 3);
    }

    @Test
    @Sql({"/test_data.sql"})
    void findAllActiveAllKonnektors() {
        List<Konnektor> lista = konnektorService.findAllActiveKonnektors();
        Assertions.assertTrue(!lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 2);
    }

    @Test
    @Sql({"/test_data.sql"})
    void filterKonnektors() {
        List<Konnektor> lista = konnektorService.filterKonnektors("127.0.0.3", "213232", "11.03", null, LocalDateTime.now());
        Assertions.assertTrue(lista.size() == 2);
    }

    @Test
    @Sql({"/test_data.sql"})
    void saveKonnektorHostname() {
        Konnektor konnektor = konnektorService.getKonnektor(1L);
        konnektorService.updateKonnektorHostname(1L, "127.3.3.3");
        Konnektor konnektorUpdated = konnektorService.getKonnektor(1L);
        Assertions.assertNotNull(konnektor);
        Assertions.assertTrue(konnektorUpdated.getHostname().equals("127.3.3.3"));
    }


    private void givenAnUnsavedKonnektor() {
        konnektor = new Konnektor();
        konnektor.setHostname(HOSTNAME);
        konnektor.setCreated(LocalDateTime.now());
    }

    private void thenNewKonnektorSaved() {
        List<Konnektor> lista = konnektorService.getAllKonnektors(null, null, null, null);
        Assertions.assertTrue(lista.size() >= 1);
        int lastIdx = lista.size() - 1;
        Konnektor lastElement = lista.get(lastIdx);
        Assertions.assertTrue(lastElement.getHostname().equals(HOSTNAME));
    }

}
