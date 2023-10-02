package com.bende.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Ignore;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

public class KonnektorServiceTest {

    private static final String HOSTNAME = "127.0.0.1";

    // we use InjectMocks because service has a repository dependency (mockito tries to inject repsoitory mocks by cunstructor injections than by property injection)
    @InjectMocks
    KonnektorServiceImpl konnektorService;
    @Mock
    KonnektorRepository konnektorRepository;
    @Mock
    Konnektor konnektor;
    @Spy
    List<Konnektor> konns = new ArrayList<>();


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetKonnektor_returnsAKonnektor() {
        givenAKonnektor();
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.of(konnektor));
        thenKonnektorIsReturned();
    }

    @Test
    public void testGetKonnektor_shouldThrowResourceNotFoundException() {
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        thenResourceNotFoundExceptionIsThrown();
    }

    @Test
    public void testCreateKonnektorShouldSucceed() {
        givenAnUnsavedKonnektor();
        konnektor.setId(1L);
        when(konnektorRepository.save(konnektor)).thenReturn(konnektor);
        thenKonnektorCreated();
    }

    @Test
    public void testDeleteKonnektor_Successfuly() {
        givenAKonnektor();
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        doNothing().when(konnektorRepository).deleteById(any(Long.class));
        konnektorService.deleteKonnektor(1L);
    }

    @Test
    public void testDeleteKonnektor_whenKonnektorNotFound_ThrowsException() {
        when(konnektorRepository.findById(1L)).thenReturn(Optional.empty());
        doNothing().when(konnektorRepository).deleteById(any(Long.class));
        thenResourceNotFoundExceptionIsThrown();
    }

  /*  @Test
    @Ignore
    public void testGetAllKonnektors() {
        givenListOfKonnektors();
        when(konnektorRepository.findAll()).thenReturn(konns);
        List<Konnektor> result = konnektorService.getAllKonnektors(null, null, null, null);

        // doReturn(2).when(konns).size();
        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(result.size(), 2);
    }*/

    @Test
    public void testUpdateKonnektorHostname_ThrowsException() {
        when(konnektorRepository.findById(1L)).thenReturn(Optional.empty());
        thenResourceNotFoundExceptionIsThrown();
    }

    @Test
    public void testUpdateKonnektorHostname_Success() {
        givenAKonnektor();
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        when(konnektorRepository.save(any(Konnektor.class))).thenReturn(konnektor);
        Assertions.assertEquals(konnektor.getHostname(), "127.3.3.3");
        konnektorService.updateKonnektorHostname(konnektor.getId(), "127.3.3.4");
        Assertions.assertEquals(konnektor.getHostname(), "127.3.3.4");
    }

    //  a verify-t arra használjuk, hogy a business (tesztelendő metódusunkban belül lévő metódusok meghívását igazoljuk (mockkal természetesen)
    @Test
    public void testDeleteKonnektor_Success() {
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        doNothing().when(konnektorRepository).deleteById(any(Long.class));
        konnektorService.deleteKonnektor(1L);
        verify(konnektorRepository).findById(1L);
        verify(konnektorRepository).deleteById(1L);
    }

    private void givenAKonnektor() {
        konnektor = new Konnektor();
        konnektor.setId(1L);
        konnektor.setHostname("127.3.3.3");
    }

    private void givenAnUnsavedKonnektor() {
        konnektor = new Konnektor();
        konnektor.setHostname(HOSTNAME);
    }

    private void thenKonnektorIsReturned() {
        Assertions.assertEquals(konnektorService.getKonnektor(1L).getId(), 1L);
    }

    private void thenResourceNotFoundExceptionIsThrown() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(1L));
    }

    private void thenKonnektorCreated() {
        konnektorService.createKonnektor(konnektor);
        Assertions.assertEquals(konnektor.getId(), 1L) ;
    }

    private void givenListOfKonnektors() {
        Konnektor konnektor = new Konnektor();
        konnektor.setId(1L);
        konnektor.setHostname(HOSTNAME);
        konns.add(konnektor);
        Konnektor konnektor1 = new Konnektor();
        konnektor.setId(2L);
        konnektor.setHostname("127.0.0.2");
        konns.add(konnektor);
    }

}
