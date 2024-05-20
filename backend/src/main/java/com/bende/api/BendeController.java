package com.bende.api;

import api.model.AuditLogDTO;
import api.model.AuditLogMessageDTO;
import api.model.KonnektorDTO;
import com.bende.persistence.model.AuditLog;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.repos.KonnektorRepository;
import com.bende.service.KonnektorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class BendeController {

    @Autowired
    KonnektorService konnektorService;

    @Autowired
    KonnektorRepository konnektorRepository;

 //   @Autowired
//    AuditlogService auditlogService;


    @GetMapping("/konnektorswithhostname")
    public ResponseEntity<List<Konnektor>> findKonnektorByActiveTrueAndHostnameContains(@RequestParam String hostname) {
        List<Konnektor> konns = konnektorRepository.findKonnektorByActiveTrueAndHostnameContains(hostname);
        return new ResponseEntity<>(konns, HttpStatus.OK);
    }


    // http://localhost:8081/api/konnektors/1
    @GetMapping("/konnektors/{konnektorId}")
    public ResponseEntity<Konnektor> getKonnektorById(@PathVariable("konnektorId") Long id) {
      // without controller advice exception handling
      /*  Optional<Konnektor> konnektor = konnektorRepository.findById(id);

        if ( konnektor.isPresent()) {
            return new ResponseEntity<Konnektor>(konnektor.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }*/

        Konnektor konnektor = konnektorService.getKonnektor(id);
        return new ResponseEntity<>(konnektor, HttpStatus.OK);
    }

    // http://localhost:8081/api/konnektors
    @GetMapping("/konnektors")
    public ResponseEntity<List<Konnektor>> getKonnektors() {

        List<Konnektor> konnektors = konnektorService.findAllActiveKonnektors();
        if (!konnektors.isEmpty()) {
            return new ResponseEntity<>(konnektors, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
            {
          "hostName": "Ut anim amet",
          "id": -84692202,
          "serialNumber": "in",
          "firmwareVersion": "anim occaecat",
          "hardwareVersion": "ad commodo dolor laboris null",
          "active": true,
          "created": "1979-10-10T01:49:02.832Z",
          "validUntil": "1952-08-01T21:51:34.148Z",
          "auditlogs": [
            {
              "id": 72173173,
              "user": "elit aute mollit aliquip",
              "konnektor": -46315735,
              "userAction": "DELETE_USER",
              "timestamp": "2004-07-17T21:16:48.072Z"
            },
            {
              "id": -30674681,
              "user": "tempor incididunt non est",
              "konnektor": 42190360,
              "userAction": "USER_LOGIN",
              "timestamp": "2005-08-01T15:28:50.273Z"
            }
          ]
        }
     */
    @PostMapping(path = "/konnektors",consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> createKonnektor(@Valid @RequestBody KonnektorDTO konnektor) {
        konnektorRepository.save(BendeController.convertKonnektorDto(konnektor, null));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping(path = "konnektors/{konnektorId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<KonnektorDTO> updateKonnektor(@Valid @PathVariable String konnektorId, @Valid @RequestBody KonnektorDTO dto) {
        Konnektor konn = convertKonnektorDto(dto, konnektorId);
        Konnektor updated = konnektorService.updateKonnektor(konn);
        return ResponseEntity.ok(convertKonnektor(updated));
    }

    @DeleteMapping(path = "konnektors/{konnektorId}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> deleteKonnektor(@PathVariable String konnektorId) {
        // successfuly deleted 200
        konnektorService.deleteKonnektor(Long.parseLong(konnektorId));
        return new ResponseEntity<>(HttpStatus.OK);

        // already delete 210
    }


    private static Konnektor convertKonnektorDto(KonnektorDTO dto, String konnektorId) {
        Konnektor konn = new Konnektor();
        if (konnektorId != null) {
            konn.setId(Long.parseLong(konnektorId));
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

       /* if (ko.getAuditlogs() != null && !ko.getAuditlogs().isEmpty()) {
            List<AuditLogDTO> lista = ko.getAuditlogs().stream().map(au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
            dto.setAuditlogs(lista);
        }*/

        return dto;
    }

    private static AuditLogDTO convertToAuditLogDTO(AuditLog log) {
        AuditLogDTO dto = new AuditLogDTO();
        dto.setId(log.getId().intValue());
        dto.setUser(log.getUser());
        /*if (log.getKonnektor() != null) {
            dto.setKonnektor(log.getKonnektor().getId().intValue());
        }*/
        dto.setUserAction(AuditLogMessageDTO.valueOf(log.getUserAction().name()));
        dto.setTimestamp(log.getTimestamp());
        return dto;
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
    @ApiOperation("filtering konnektors")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<KonnektorDTO>> getAllKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
      List<Konnektor> lista = konnektorService.filterKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
        List<KonnektorDTO> dtos =  lista.stream().map(k -> BendeController.convertKonnektor(k)).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
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




*/
}
