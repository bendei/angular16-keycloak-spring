package com.bende.api;

import com.bende.api.model.ArtistResponseDTO;
import com.bende.api.model.AuditLogDTO;
import com.bende.api.model.AuditLogMessageDTO;
import com.bende.api.model.CreateAuditLogRequestDTO;
import com.bende.api.model.EmployeesResponseDTO;
import com.bende.api.model.KonnektorDTO;
import com.bende.api.model.UpdateKonnektorHostnameRequestDTO;
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
    public ResponseEntity<List<AuditLogDTO>> getAuditLog() {
        List<AuditLogDTO> lista = auditLogRepository.findAll().stream().map(au -> BendeController.convertToAuditLogDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation("")
    public ResponseEntity<List<EmployeesResponseDTO>> getAllEmployees() {
        List<EmployeesResponseDTO> lista = employeeRepository.findAll().stream().map(au -> BendeController.convertToEmployeeDTO(au)).collect(Collectors.toList());
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @Override
    @ApiOperation(" create auditlog")
    public  ResponseEntity<Void> createAuditLog(CreateAuditLogRequestDTO request) {
        Optional<Konnektor> konnektor = konnektorRepository.findById(Long.valueOf(request.getKonnektor()));

        if (konnektor.isPresent()) {
            AuditLog log = new AuditLog();
            log.setTimestamp(LocalDateTime.now());
            log.setUser(request.getUser());
            log.setUserAction(UserActionType.valueOf(request.getUserAction().getValue()));
            log.setKonnektor(konnektor.get());
            auditLogRepository.save(log);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @ApiOperation("")
    public ResponseEntity<KonnektorDTO> getKonnektor(final String konnektorId) {
        Konnektor konnektor = konnektorService.getKonnektor(Long.valueOf(Long.valueOf(konnektorId)));
        KonnektorDTO dto = convertKonnektor(konnektor);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @Override
    @ApiOperation("")
    public ResponseEntity<Void> createKonnektor(KonnektorDTO konnektor) {
        konnektorRepository.save(BendeController.convertKonnektorDto(konnektor));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    @ApiOperation("filtering konnektors")
    public ResponseEntity<List<KonnektorDTO>> getAllKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
      List<Konnektor> lista = konnektorService.filterKonnektors(hostname, serialNumber, firmwareVersion, hardwareVersion, created);
        List<KonnektorDTO> dtos =  lista.stream().map(k -> BendeController.convertKonnektor(k)).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @Override
    @ApiOperation("filtering konnektors")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Void> updateKonnektorHostname(UpdateKonnektorHostnameRequestDTO dto) {
        konnektorService.updateKonnektorHostname(dto.getKonnektorId(), dto.getHostname());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
/*
    @Override
    @ApiImplicitParam("delete ")
    public ResponseEntity<Void> deleteKonnektor(final String konnektorId) {
        konnektorService.deleteKonnektor(Long.valueOf(konnektorId));
        return new ResponseEntity<>(HttpStatus.OK);
    }*/

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
        dto.setKonnektor(log.getKonnektor().getId().intValue());
        dto.setUserAction(AuditLogMessageDTO.valueOf(log.getUserAction().name()));
        dto.setTimestamp(log.getTimestamp());
        return dto;
    }

    private static Konnektor convertKonnektorDto(KonnektorDTO dto) {
        Konnektor konn = new Konnektor();
        konn.setHostname(dto.getHostname());
        return konn;
    }

    private static KonnektorDTO convertKonnektor(Konnektor ko) {
        KonnektorDTO dto = new KonnektorDTO();
        dto.setId(ko.getId().intValue());
        dto.setHostname(ko.getHostname());
        dto.serialNumber(ko.getSerialNumber());
        dto.setFirmwareVersion(ko.getFirmwareVersion());
        dto.setHardwareVersion(ko.getHardwareVersion());
        dto.setActive(ko.isActive());
        dto.setCreated(ko.getCreated());
        /*if (ko.getAuditlogs() != null && !ko.getAuditlogs().isEmpty()) {
            List logs = new ArrayList<AuditLog>();
            logs.addAll(ko.getAuditlogs());
            dto.setAuditlogs(logs);
        }*/
        return dto;
    }

}
