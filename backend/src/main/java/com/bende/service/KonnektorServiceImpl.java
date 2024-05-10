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
        return konnektorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Konnektor mit dem id:" + id + "  nicht gefunden"));
    }

    @Override
    public Konnektor createKonnektor(final Konnektor konnektor) {
        return konnektorRepository.save(konnektor);
    }

    @Override
    public List<Konnektor> getAllKonnektors() {
        return konnektorRepository.findAll();
    }

    @Override
    public void deleteKonnektor(final Long id) {
       if (konnektorRepository.findById(id).isEmpty()) {
           throw new ResourceNotFoundException("Konnektor mit dem id:" + id + "  nicht gefunden, es kann nicht gelöscht werden.");
       }
       konnektorRepository.deleteById(id);
    }

    @Override
    public List<Konnektor> findAllActiveKonnektors() {
        //return konnektorRepository.findAllActiveKonnektors();
        return konnektorRepository.findAllByActiveTrue();
    }

    @Override
    public List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
        return konnektorRepository.filterKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
    }

    @Override
    public Konnektor updateKonnektor(Konnektor konnektor) throws ResourceNotFoundException{
       konnektorRepository.findById(konnektor.getId()).orElseThrow(() -> new ResourceNotFoundException("Konnektor mit dem id:" + konnektor.getId() + " nicht gefunden, es kann nicht geupdated werden."));
       return konnektorRepository.save(konnektor);
    }

    @Override
    public void updateKonnektorHostname(final Long id, final String hostname) {
        Konnektor konn = konnektorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Konnektor mit dem id:" + id + "  gefunden, Hostname kann nicht geupdated werden."));
        konn.setHostname(hostname);
        konnektorRepository.save(konn);
    }

}
