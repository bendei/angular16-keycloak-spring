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
@SpringBootTest(classes = {Application.class, KonnektorService.class, KonnektorRepository.class})   // creates an AőőlicationContext -> for using @Autowired
public class KonnektorServiceDBTest {

    private static final String HOSTNAME = "127.0.0.1";
    @Mock
    Konnektor konnektor;
    // a servicet nem mockoljuk ki mert valóban meg akarjuk hivni
    @Autowired
    KonnektorRepository konnektorRepository;
    // a servicet nem mockoljuk ki mert valóban meg akarjuk hivni
    @Autowired
    KonnektorService konnektorService;

    @Test
    public void testGetKonnektor_returnsAKonnektor() {
        Konnektor konnektor = konnektorService.getKonnektor(1L);
        Assertions.assertNotNull(konnektor);
        Assertions.assertEquals(konnektor.getHostname(), "127.0.0.2");
    }

    @Test
    public void testgetKonnektor_shouldThrowException() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(11111L));
    }

    @Test
    public void testCreateKonnektor_shouldSuccessful() {
        givenAnUnsavedKonnektor();
        konnektorService.createKonnektor(konnektor);
        thenNewKonnektorSaved();
    }
    @Test
    @Sql({"/test_data.sql"})
    public void testGetAllKonnektors() {
        List<Konnektor> lista = konnektorService.getAllKonnektors(null, null, null, null);
        Assertions.assertFalse(lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 3);
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testFindAllActiveAllKonnektors() {
        List<Konnektor> lista = konnektorService.findAllActiveKonnektors();
        Assertions.assertFalse(lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 2);
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testFilterKonnektors() {
        List<Konnektor> lista = konnektorService.filterKonnektors("127.0.0.3", "213232", "11.03", null, null);
        Assertions.assertEquals(lista.size(), 3);
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testUpdateKonnektor() {
        Konnektor konnektor = konnektorService.getKonnektor(1L);
        givenKonnektorToBeUpdated(konnektor);
        konnektorService.updateKonnektor(konnektor);
        Konnektor konnektorUpdated = konnektorService.getKonnektor(1L);
        thenKonnektorUpdated(konnektorUpdated);
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testUpdateKonnektorHostname_ThrowsException() {
        Assertions.assertThrows(ResourceNotFoundException.class, () ->
            konnektorService.updateKonnektorHostname(11111L, "hhh")
        );
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testUpdateKonnektorHostname_Success() {
        givenKonnektorFromDB();
        konnektorService.updateKonnektorHostname(10L, "newhostname");
        givenKonnektorFromDB();
        Assertions.assertEquals(konnektor.getHostname(), "newhostname");
    }

    @Test
    @Sql({"/test_data.sql"})
    public void testDeleteKonnektor_Success() {
        givenKonnektorFromDB();
        Assertions.assertNotNull(konnektor);
        konnektorService.deleteKonnektor(konnektor.getId());
        Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(10L));
    }

    private void givenKonnektorFromDB() {
        konnektor = konnektorService.getKonnektor(10L);
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
        Assertions.assertEquals(lastElement.getHostname(), HOSTNAME);
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
        Assertions.assertEquals(konn.getHostname(), "127.3.3.3");
        Assertions.assertEquals(konn.getHardwareVersion(), "hw.1.1");
        Assertions.assertNull(konn.getFirmwareVersion());
        Assertions.assertNull(konn.getSerialNumber());
        Assertions.assertTrue(konn.isActive());
        Assertions.assertEquals(konn.getCreated().getYear(), 2015);
    }

}
