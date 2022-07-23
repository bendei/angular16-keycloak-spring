package com.bende.service;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
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

public class KonnektorServiceTest {

    private static final String HOSTNAME = "127.0.0.1";
    @InjectMocks
    KonnektorServiceImpl konnektorService;
    @Mock
    KonnektorRepository konnektorRepository;
    @Mock
    Konnektor konnektor;
    @Spy
    List<Konnektor> konns = new ArrayList<Konnektor>();


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getKonnektor_returnsAKonnektor() {
        givenAKonnektor();
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        thenKonnektorIsReturned();
    }

    @Test
    void GetKonnektor_shouldThrowResourceNotFoundException() {
        when(konnektorRepository.findById(1L)).thenReturn(Optional.empty());
        thenResourceNotFoundExceptionIsThrown();
    }

    @Test
    void createKonnektorShouldSucceed() {
        givenAnUnsavedKonnektor();
        konnektor.setId(1L);
        when(konnektorRepository.save(konnektor)).thenReturn(konnektor);
        thenKonnektorCreated();
    }

    @Test
    void deleteKonnektor_Successfuly() {
        givenAKonnektor();
        when(konnektorRepository.findById(1L)).thenReturn(Optional.of(konnektor));
        doNothing().when(konnektorRepository).deleteById(1L);
        konnektorService.deleteKonnektor(1L);
    }

    @Test
    void deleteKonnektor_whenKonnektorNotFound_ThrowsException() {
        when(konnektorRepository.findById(1L)).thenReturn(Optional.empty());
        doNothing().when(konnektorRepository).deleteById(1L);
        thenResourceNotFoundExceptionIsThrown();
    }

    @Test
    void getAllKonnektors() {
        givenListOfKonnektors();
        when(konnektorRepository.findAll()).thenReturn(konns);
        List<Konnektor> result = konnektorService.getAllKonnektors(null, null, null, null);

        // doReturn(2).when(konns).size();
        Assertions.assertTrue(!result.isEmpty());
        Assertions.assertTrue(result.size() == 2);
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
        Assertions.assertTrue(konnektorService.getKonnektor(1L).getId() == 1L);
    }

    private void thenResourceNotFoundExceptionIsThrown() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> konnektorService.getKonnektor(1L));
    }

    private void thenKonnektorCreated() {
        konnektorService.createKonnektor(konnektor);
        Assertions.assertTrue(konnektor.getId() == 1L) ;
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
