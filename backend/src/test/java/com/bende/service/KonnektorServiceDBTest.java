package com.bende.service;

import com.bende.Application;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

/**
 * INTEGRATION TEST SERVICE WITH REPOSITORY + db for testing KonnektorService, using real sql data (@SQL annotation loads test_data.sql for testing
 */

@Transactional  // rolls back transaction after each Test -> no after cleanup is necessary (like deleteing entity after creating one in Test)
//@DataJpaTest
@Sql({"/test_data.sql", "/data.sql"})  // to execute sql before test
@SpringBootTest(classes = {Application.class, KonnektorService.class})   // creates an ApplicationContext -> for using @Autowired
//@AutoConfigureMockMvc
public class KonnektorServiceDBTest {

    private static final String HOSTNAME = "127.0.0.1";
    @Mock
    Konnektor konnektor;
    // a servicet nem mockoljuk ki mert valóban meg akarjuk hivni
    @Autowired  // mivel a Spring Application contextet is inditjuk igy injektálnunk kell a tesztelendő szervizt is
    KonnektorService konnektorService;

    @Test
    public void testGetKonnektor_returnsAKonnektor() {
        //when
        Konnektor konnektor = konnektorService.getKonnektor(7L);
        //then
        Assertions.assertNotNull(konnektor);
        Assertions.assertEquals(konnektor.getHostname(), "127.0.0.4");
    }

    @Test
    public void testGetKonnektor_shouldThrowException() {
        //when
        ResourceNotFoundException ersExc = Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(11111L));
        //then
        Assertions.assertNotNull(ersExc);
    }

    @Test
    public void testCreateKonnektor_shouldSuccessful() {
        //given
        givenAnUnsavedKonnektor();
        //when
        Konnektor saved = konnektorService.createKonnektor(konnektor);
       //then
        Assertions.assertNotNull(saved);
        Assertions.assertNotNull(saved.getId());
    }

    @Test
    public void testGetAllKonnektors() {
        //when
        List<Konnektor> lista = konnektorService.getAllKonnektors();
        //then
        Assertions.assertFalse(lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 3);
    }

    @Test
    public void testFindAllActiveAllKonnektors() {
        //when
        List<Konnektor> lista = konnektorService.findAllActiveKonnektors();
        //then
        Assertions.assertFalse(lista.isEmpty());
        Assertions.assertTrue(lista.size() >= 2);
        lista.forEach( (konn) -> {
            Assertions.assertTrue(konn.isActive());
        });
    }

    @Test
    public void testFilterKonnektors() {
        //when
        List<Konnektor> lista = konnektorService.filterKonnektors("127.0.0.3", "213232", "11.03", null, null);
        //then
        Assertions.assertEquals(lista.size(), 3);
    }

    @Test
    @Transactional
    public void testUpdateKonnektor() {
        //given
        Konnektor konnektor = konnektorService.getKonnektor(2L);
        givenKonnektorToBeUpdated(konnektor);
        //when
        Konnektor updatedKonnektor = konnektorService.updateKonnektor(konnektor);
        //then
        thenKonnektorUpdated(updatedKonnektor);
    }

    @Test
    public void testUpdateKonnektorHostname_ThrowsException() {
        Assertions.assertThrows(ResourceNotFoundException.class, () ->
            konnektorService.updateKonnektorHostname(11111L, "hhh")
        );
    }

    @Test
    public void testUpdateKonnektorHostname_Success() {
        //given
        givenKonnektorFromDB();
        //when
        konnektorService.updateKonnektorHostname(2L, "newhostname");
        givenKonnektorFromDB();
        //then
        Assertions.assertEquals(konnektor.getHostname(), "newhostname");
    }

    @Test
    public void testDeleteKonnektor_Success() {
        //when
        Konnektor  konnektorTested= konnektorService.getKonnektor(2L);
        //then
        Assertions.assertDoesNotThrow(() -> konnektorService.deleteKonnektor(konnektorTested.getId()));
    }

    private void givenKonnektorFromDB() {
        konnektor = konnektorService.getKonnektor(2L);
    }

    private void givenAnUnsavedKonnektor() {
        konnektor = new Konnektor();
        konnektor.setHostname(HOSTNAME);
        konnektor.setCreated(LocalDateTime.now());
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
