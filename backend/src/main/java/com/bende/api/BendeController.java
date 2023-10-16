package com.bende.api;

import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import com.bende.service.AuditlogService;
import com.bende.service.KonnektorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class BendeController {

    @Autowired
    KonnektorService konnektorService;

    @Autowired
    KonnektorRepository konnektorRepository;

//    @Autowired
//    AuditlogService auditlogService;


    @GetMapping("/auditlogs/{auditlogId}")
    public ResponseEntity<String> getAuditLogs(@PathVariable("auditlogId") String id) {




        //List<AuditLogDTO> lista = auditlogService.findById(Long.parseLong(auditlogId)).stream().map(au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/konnektors/{konnektorId}")
    public ResponseEntity<Konnektor> getKonnektorById(@PathVariable("konnektorId") Long id) {

        Optional<Konnektor> konnektor = konnektorRepository.findById(id);

        if ( konnektor.isPresent()) {
            return new ResponseEntity<Konnektor>(konnektor.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }


   /* @Override
    @ApiOperation("auditlogs to a given konnektor")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<AuditLogDTO>> getAllAuditLog(final Integer konnektorId) {
        List<AuditLogDTO> lista = auditlogService.findAuditLogsByKonnektorId(konnektorId.longValue()).stream()
            .map(au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation(" create auditlog")
    @CrossOrigin("http://localhost:4200")
    public  ResponseEntity<Void> createAuditLog(List<AuditLogDTO> dtos) {

        if (dtos != null && !dtos.isEmpty()) {
            Optional<Konnektor> konnektor = konnektorRepository.findById(Long.valueOf(dtos.get(0).getKonnektor()));

            konnektor.ifPresent( konn -> dtos.forEach(dto -> createNewAuditLog(dto, konnektor.get())));

            *//*  if (konnektor.isPresent()) {
                dtos.forEach(dto -> createNewAuditLog(dto, konnektor.get()));
            }*//*
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @ApiOperation(" delete auditlog")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> deleteAuditlog(final String auditlogId) {
        auditlogService.deleteAuditlog(Long.parseLong(auditlogId));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void createNewAuditLog(AuditLogDTO dto, Konnektor konnektor) {
        AuditLog log = new AuditLog();
        log.setTimestamp(LocalDateTime.now());
        log.setUser(dto.getUser());
        log.setUserAction(UserActionType.valueOf(dto.getUserAction().getValue()));
        log.setKonnektor(konnektor);
        auditlogService.createAuditLog(log);
    }

    @Override
    @ApiOperation(" update auditlog")
    @CrossOrigin("http://localhost:4200")
    public  ResponseEntity<Void> updateAuditlog(final String auditlogId, AuditLogDTO request) {
        Optional<AuditLog> log = auditlogService.findById(request.getId());
        if (log.isEmpty()) {
            throw new ResourceNotFoundException("Auditlog with id: " + auditlogId + " was not found");
        }

        Konnektor konn = konnektorService.getKonnektor(request.getKonnektor().longValue());
        if (konn != null) {
            auditlogService.updateAuditlog(convertToAuditLog(request, konn));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    @ApiOperation(" update auditlog")
    @CrossOrigin("http://localhost:4200")
    public  ResponseEntity<Void>  updateMoreAuditlog(List<AuditLogDTO> auditLogDTO) {
        Konnektor konn = konnektorService.getKonnektor(Long.valueOf(auditLogDTO.get(0).getKonnektor()));
        if (konn == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<AuditLog> logs = new ArrayList<>();
        auditLogDTO.forEach(dto -> {
           AuditLog log =  BendeController.convertToAuditLog(dto, konn);
           logs.add(log);
        });
        auditlogService.updateAuditlogs(logs);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    @ApiOperation("")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<KonnektorDTO> getKonnektor(final String konnektorId) {
        Konnektor konnektor = konnektorService.getKonnektor(Long.valueOf(konnektorId));
        KonnektorDTO dto = convertKonnektor(konnektor);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return KonnektorsApi.super.getRequest();
    }

    @Override
    @ApiOperation("")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> createKonnektor(KonnektorDTO konnektor) {
        konnektorRepository.save(BendeController.convertKonnektorDto(konnektor, null));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    @ApiOperation("filtering konnektors")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<KonnektorDTO>> getAllKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
      List<Konnektor> lista = konnektorService.filterKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
        List<KonnektorDTO> dtos =  lista.stream().map(k -> BendeController.convertKonnektor(k)).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @Override
    @ApiOperation("updating konnektors - PUT")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> updateKonnektor(String konnektorId, KonnektorDTO dto) {
        Konnektor konn = convertKonnektorDto(dto, konnektorId);
        konnektorService.updateKonnektor(konn);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    @ApiOperation("updating konnektor hostname - PATCH")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> updateKonnektorHostname(String konnektorId, KonnektorHostnameDTO konnektorHostnameDTO) {
        konnektorService.updateKonnektorHostname(Long.parseLong(konnektorId), konnektorHostnameDTO.getHostName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    @ApiOperation("udeletes a konnektor")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> deleteKonnektor(final String konnektorId) {
        konnektorService.deleteKonnektor(Long.valueOf(konnektorId));
        return new ResponseEntity<>(HttpStatus.OK);
    }

   private static AuditLogDTO convertToAuditLogDTO(AuditLog log) {
        AuditLogDTO dto = new AuditLogDTO();
        dto.setId(log.getId().intValue());
        dto.setUser(log.getUser());
        if (log.getKonnektor() != null) {
            dto.setKonnektor(log.getKonnektor().getId().intValue());
        }
        dto.setUserAction(AuditLogMessageDTO.valueOf(log.getUserAction().name()));
        dto.setTimestamp(log.getTimestamp());
        return dto;
    }

    private static AuditLog convertToAuditLog(AuditLogDTO dto, Konnektor konnektor) {
        AuditLog log = new AuditLog();
        log.setId(dto.getId().longValue());
        log.setTimestamp(dto.getTimestamp());
        log.setUser(dto.getUser());
        log.setUserAction(UserActionType.valueOf(dto.getUserAction().getValue()));
        if (konnektor != null) {
            log.setKonnektor(konnektor);
        }
        return log;
    }

    private static Konnektor convertKonnektorDto(KonnektorDTO dto, String konnektorId) {
        Konnektor konn = new Konnektor();
        if (konnektorId != null) {
           konn.setId(dto.getId().longValue());
        }
        konn.setHostname(dto.getHostName());
        konn.setSerialNumber(dto.getSerialNumber());
        konn.setFirmwareVersion(dto.getFirmwareVersion());
        konn.setHardwareVersion(dto.getHardwareVersion());
        konn.setActive(dto.getActive());
        konn.setCreated(dto.getCreated());
        return konn;
    }

    private static KonnektorDTO convertKonnektor(Konnektor ko) {
        KonnektorDTO dto = new KonnektorDTO();
        dto.setId(ko.getId().intValue());
        dto.setHostName(ko.getHostname());
        dto.serialNumber(ko.getSerialNumber());
        dto.setFirmwareVersion(ko.getFirmwareVersion());
        dto.setHardwareVersion(ko.getHardwareVersion());
        dto.setActive(ko.isActive());
        dto.setCreated(ko.getCreated());
        dto.setValidUntil(ko.getValidUntil());

        if (ko.getAuditlogs() != null && !ko.getAuditlogs().isEmpty()) {
            List<AuditLogDTO> lista = ko.getAuditlogs().stream().map( au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
            dto.setAuditlogs(lista);
        }

        return dto;
    }
*/
}
