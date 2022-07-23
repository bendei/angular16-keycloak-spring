package com.bende.service;

import com.bende.Application;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import java.time.LocalDateTime;
import java.time.Month;
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
    void updateKonnektor() {
        Konnektor konnektor = konnektorService.getKonnektor(1L);
        givenKonnektorToBeUpdated(konnektor);
        konnektorService.updateKonnektor(konnektor);
        Konnektor konnektorUpdated = konnektorService.getKonnektor(1L);
        thenKonnektorUpdated(konnektorUpdated);
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

    private void givenKonnektorToBeUpdated(Konnektor konn) {
        konn.setHostname("127.3.3.3");
        konn.setHardwareVersion("hw.1.1");
        konn.setFirmwareVersion(null);
        konn.setSerialNumber(null);
        konn.setActive(true);
        LocalDateTime aDateTime = LocalDateTime.of(2015, Month.JULY, 29, 19, 30, 40);
        konn.setCreated(aDateTime);
    }

    private void thenKonnektorUpdated(Konnektor konn) {
        Assertions.assertNotNull(konnektor);
        Assertions.assertTrue(konn.getHostname().equals("127.3.3.3"));
        Assertions.assertTrue(konn.getHardwareVersion().equals("hw.1.1"));
        Assertions.assertNull(konn.getFirmwareVersion());
        Assertions.assertNull(konn.getSerialNumber());
        Assertions.assertTrue(konn.isActive());
        Assertions.assertTrue(konn.getCreated().getYear() == 2015);
    }

}
