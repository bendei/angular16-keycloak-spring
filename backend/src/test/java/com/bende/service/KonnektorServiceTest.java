package com.bende.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;


/*
    UNIT TEST -> REPOSITORY MOCKED OUT:  single component -> mocking out dependencies, no real sql db used, just mocked results
 */
public class KonnektorServiceTest {

    private static final String HOSTNAME = "127.0.0.1";

    // we aks Mockito to inject the Mocks -> Repsoitory into this testable Objekt
    // we use InjectMocks because service has a repository dependency (mockito tries to inject repsoitory mocks by cunstructor injections than by property injection)
    // a service objektum nincs kimokkolva, hiszen ezt akarjuk tesztelni, csak a dependencjeit mokkuljuk ki
    @InjectMocks
    KonnektorServiceImpl konnektorService;
    @Mock
    KonnektorRepository konnektorRepository;
    Konnektor konnektor;
    @Spy
    List<Konnektor> konns = new ArrayList<>();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetKonnektor_returnsAKonnektor() {
        // given
        givenAKonnektor();
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.of(konnektor));
        // when
        Konnektor result = konnektorService.getKonnektor(konnektor.getId());
        //then
        verify(konnektorRepository).findById(1L);    //  a verify-t arra használjuk, hogy a business (tesztelendő metódusunkban belül lévő metódusok meghívását igazoljuk (mockkal természetesen)
        Assertions.assertEquals(result.getId(), konnektor.getId());
    }

    @Test
    public void testGetKonnektor_shouldThrowResourceNotFoundException() {
        //given
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        //then
        ResourceNotFoundException exc = Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(1L));
        Assertions.assertEquals(exc.getMessage(), "Konnektor mit dem id:1  nicht gefunden");
    }

    @Test
    public void testCreateKonnektorShouldSucceed() {
        //given
        Konnektor toBeSaved = new Konnektor();
        toBeSaved.setHostname(HOSTNAME);
        givenAKonnektor();
        when(konnektorRepository.save(any(Konnektor.class))).thenReturn(konnektor);
        //when
        Konnektor saved = konnektorService.createKonnektor(toBeSaved);
        //then
        verify(konnektorRepository).save(toBeSaved);
        Assertions.assertEquals(saved.getId(), konnektor.getId()) ;
    }

    @Test
    public void testDeleteKonnektor_Successfuly() {
        //given
        givenAKonnektor();
        when(konnektorRepository.findById(konnektor.getId())).thenReturn(Optional.of(konnektor));
        doNothing().when(konnektorRepository).deleteById(any(Long.class));
        //when
        konnektorService.deleteKonnektor(konnektor.getId());
        //then
        verify(konnektorRepository).findById(konnektor.getId());
        verify(konnektorRepository).deleteById(konnektor.getId());
    }

    @Test
    public void testDeleteKonnektor_Success() {
        //given
        givenAKonnektor();
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        doNothing().when(konnektorRepository).deleteById(any(Long.class));
        //when
        konnektorService.deleteKonnektor(1L);
        //then
        verify(konnektorRepository).findById(1L);
        verify(konnektorRepository).deleteById(1L);
    }

    @Test
    public void testDeleteKonnektor_whenKonnektorNotFound_ThrowsException() {
        //given
        when(konnektorRepository.findById(1L)).thenReturn(Optional.empty());
        //when
        ResourceNotFoundException exc = Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.deleteKonnektor(1L));
        //then
        verify(konnektorRepository).findById(1L);
        Assertions.assertEquals(exc.getMessage(), "Konnektor mit dem id:1  nicht gefunden, es kann nicht gelöscht werden.");
    }

    @Test
    public void testGetAllKonnektors() {
        //given
        givenListOfKonnektors();
        when(konnektorRepository.filterKonnektors(any(String.class), any(String.class), any(String.class), any(String.class), any(LocalDateTime.class))).thenReturn(konns);
        //when
        List<Konnektor> result = konnektorService.filterKonnektors("","2","", "", LocalDateTime.now());
        //then
        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(result.size(), 2);
    }

    @Test
    public void testUpdateKonnektorHostname_ThrowsException() {
        //given
        givenAKonnektor();
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        //when
        ResourceNotFoundException exc = Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.updateKonnektor(konnektor));
        //then
        verify(konnektorRepository).findById(1L);
        Assertions.assertEquals(exc.getMessage(), "Konnektor mit dem id:1 nicht gefunden, es kann nicht geupdated werden.");
    }

    @Test
    public void testUpdateKonnektorHostname_Success() {
        //given
        givenAKonnektor();
        Konnektor saved = new Konnektor();
        saved.setId(konnektor.getId());
        saved.setHostname("127.3.3.4");
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        when(konnektorRepository.save(any(Konnektor.class))).thenReturn(saved);
        //when
        konnektorService.updateKonnektorHostname(konnektor.getId(), "127.3.3.4");
        //then
        verify(konnektorRepository).findById(konnektor.getId());
        verify(konnektorRepository).save(konnektor);
        Assertions.assertEquals(saved.getHostname(), "127.3.3.4");
    }

    private void givenAKonnektor() {
        konnektor = new Konnektor();
        konnektor.setId(1L);
        konnektor.setHostname(HOSTNAME);
        konnektor.setSerialNumber("11111");
    }

    private void givenListOfKonnektors() {
        Konnektor konnektor = new Konnektor();
        konnektor.setId(1L);
        konnektor.setHostname(HOSTNAME);
        konns.add(konnektor);
        Konnektor konnektor1 = new Konnektor();
        konnektor.setId(2L);
        konnektor.setHostname("127.0.0.2");
        konns.add(konnektor1);
    }

}
