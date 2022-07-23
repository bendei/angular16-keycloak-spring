package com.bende.service;

import com.bende.persistence.model.Konnektor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface KonnektorService {

    Konnektor getKonnektor(Long id);

    void createKonnektor(Konnektor konnektor);

    List<Konnektor> getAllKonnektors(String serialNumber, String firmwareVersion, String hardwareVersion, LocalDate created);

    void deleteKonnektor(Long id);

    List<Konnektor> findAllActiveKonnektors();

    List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created);

    void updateKonnektor(Konnektor konn);

}
