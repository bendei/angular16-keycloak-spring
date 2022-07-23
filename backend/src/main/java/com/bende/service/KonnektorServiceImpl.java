package com.bende.service;

import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KonnektorServiceImpl implements KonnektorService {

    @Autowired
    KonnektorRepository konnektorRepository;

    @Override
    public Konnektor getKonnektor(final Long id) {
        return konnektorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Konnektor mit dem id {id} nicht gefunden"));
    }

    @Override
    public void createKonnektor(final Konnektor konnektor) {
        konnektorRepository.save(konnektor);
    }

    @Override
    public List<Konnektor> getAllKonnektors(String serialNumber, String firmwareVersion, String hardwareVersion, LocalDate created) {
        return konnektorRepository.findAll();
    }

    @Override
    public void deleteKonnektor(final Long id) {
       if (konnektorRepository.findById(id).isEmpty()) {
           throw new ResourceNotFoundException("Konnektor mit dem id {id} nicht gefunden");
       }
       konnektorRepository.deleteById(id);
    }

    @Override
    public List<Konnektor> findAllActiveKonnektors() {
        return konnektorRepository.findAllActiveKonnektors();
    }

    @Override
    public List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
        return konnektorRepository.filterKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
    }

    @Override
    public void updateKonnektor(Konnektor konnektor) throws ResourceNotFoundException{
       konnektorRepository.findById(konnektor.getId()).orElseThrow(() -> new ResourceNotFoundException("Konnektor mit dem id {id} nicht gefunden"));
       konnektorRepository.save(konnektor);
    }

}
