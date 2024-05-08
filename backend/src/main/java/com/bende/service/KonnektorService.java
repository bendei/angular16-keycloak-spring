package com.bende.service;

import com.bende.persistence.model.Konnektor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface KonnektorService {

    Konnektor getKonnektor(Long id);

    Konnektor createKonnektor(Konnektor konnektor);

    List<Konnektor> getAllKonnektors();

    void deleteKonnektor(Long id);

    List<Konnektor> findAllActiveKonnektors();

    List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created);

    Konnektor updateKonnektor(Konnektor konn);

    void updateKonnektorHostname(Long id, String hostname);

}
