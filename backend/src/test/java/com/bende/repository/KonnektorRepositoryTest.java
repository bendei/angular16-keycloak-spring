package com.bende.repository;

import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class KonnektorRepositoryTest {

    @Mock
    Konnektor konnektor;
    @Mock
    KonnektorRepository konnektorRepository;

    @Test
    public void testGetKonnektor_returnsAKonnektor() {
        givenAKonnektor();
        when(konnektorRepository.findById(any(Long.class))).thenReturn(Optional.of(konnektor));
    }

    private void givenAKonnektor() {
        konnektor = new Konnektor();
        konnektor.setId(1L);
        konnektor.setHostname("127.3.3.3");
    }
}
