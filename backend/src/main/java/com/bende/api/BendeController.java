package com.bende.api;

import com.bende.api.model.ArtistResponseDTO;
import com.bende.api.model.AuditLogDTO;
import com.bende.api.model.AuditLogMessageDTO;
import com.bende.api.model.CreateAuditLogRequestDTO;
import com.bende.api.model.EmployeesResponseDTO;
import com.bende.api.model.KonnektorDTO;
import com.bende.api.model.KonnektorHostnameDTO;
import com.bende.persistence.model.AuditLog;
import com.bende.persistence.model.Employee;
import com.bende.persistence.model.Konnektor;
import com.bende.persistence.model.UserActionType;
import com.bende.persistence.repos.AuditLogRepository;
import com.bende.persistence.repos.EmployeeRepository;
import com.bende.persistence.repos.KonnektorRepository;
import com.bende.service.KonnektorService;
import io.swagger.annotations.ApiOperation;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;

@RestController
public class BendeController implements ArtistsApi, EmployeesApi, AuditLogApi, KonnektorsApi {

    @Autowired
    KonnektorService konnektorService;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    KonnektorRepository konnektorRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return ArtistsApi.super.getRequest();
    }

    @Override
    @ApiOperation("the artists API")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<ArtistResponseDTO>> getAllArtists() {
        ArtistResponseDTO dto = new ArtistResponseDTO();
        dto.setId(1);
        dto.setUsername("bende www 3");
        dto.setRole("role");
        List<ArtistResponseDTO> lista = new ArrayList();
        lista.add(dto);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation("the auditlog API")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<AuditLogDTO>> getAuditLog() {
        List<AuditLogDTO> lista = auditLogRepository.findAll().stream().map(au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation("")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<EmployeesResponseDTO>> getAllEmployees() {
        List<EmployeesResponseDTO> lista = employeeRepository.findAll().stream().map(au -> BendeController.convertToEmployeeDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation(" create auditlog")
    @CrossOrigin("http://localhost:4200")
    public  ResponseEntity<Void> createAuditLog(CreateAuditLogRequestDTO request) {
        Optional<Konnektor> konnektor = konnektorRepository.findById(Long.valueOf(request.getKonnektor()));

        if (konnektor.isPresent()) {
            AuditLog log = new AuditLog();
            log.setTimestamp(LocalDateTime.now());
            log.setUser(request.getUser());
            log.setUserAction(UserActionType.valueOf(request.getUserAction().getValue()));
            //log.setKonnektor(konnektor.get());
            auditLogRepository.save(log);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @ApiOperation("")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<KonnektorDTO> getKonnektor(final String konnektorId) {
        Konnektor konnektor = konnektorService.getKonnektor(Long.valueOf(Long.valueOf(konnektorId)));
        KonnektorDTO dto = convertKonnektor(konnektor);
        return new ResponseEntity<>(dto, HttpStatus.OK);
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

    private static EmployeesResponseDTO convertToEmployeeDTO(Employee emp) {
        EmployeesResponseDTO dto = new EmployeesResponseDTO();
        dto.setId(emp.getId().intValue());
        dto.setEmail(emp.getEmail());
        dto.setFirstname(emp.getFirstName());
        dto.setLastname(emp.getLastName());
        return dto;
    }

    private static AuditLogDTO convertToAuditLogDTO(AuditLog log) {
        AuditLogDTO dto = new AuditLogDTO();
        dto.setId(log.getId().intValue());
        dto.setUser(log.getUser());
        //dto.setKonnektor(log.getKonnektor().getId().intValue());
        dto.setUserAction(AuditLogMessageDTO.valueOf(log.getUserAction().name()));
        dto.setTimestamp(log.getTimestamp());
        return dto;
    }

    private static Konnektor convertKonnektorDto(KonnektorDTO dto, String konnektorId) {
        Konnektor konn = new Konnektor();
        if (konnektorId == null) {
            konn.setId(Long.getLong(konnektorId));
        } else {
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
        if (ko.getAuditlogs() != null && !ko.getAuditlogs().isEmpty()) {
            List logs = new ArrayList<AuditLog>();
            logs.addAll(ko.getAuditlogs());
            dto.setAuditlogs(logs);
        }
        return dto;
    }

}
