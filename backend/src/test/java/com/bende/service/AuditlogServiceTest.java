package com.bende.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.AuditLog;
import com.bende.persistence.model.UserActionType;
import com.bende.persistence.repos.AuditLogRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class AuditlogServiceTest {

    // we use InjectMocks because service has a repository dependency (mockito tries to inject repsoitory mocks by cunstructor injections than by property injection)
    @InjectMocks
    AuditlogServiceImpl auditlogService;

    @Mock
    AuditLogRepository auditLogRepository;

    private List<AuditLog> logs = new ArrayList<>();
    private AuditLog log;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAuditlogs_sucessfully() {
        givenAuditlogs();
        when(auditLogRepository.findAll()).thenReturn(logs);
        thenAuditlogsReturned();
    }

    @Test
    public void testCreateAuditlog_successfully() {
        givenAuditlog();
        when(auditLogRepository.save(any(AuditLog.class))).thenReturn(log);
        thenAuditlogCreated();
    }

    @Test
    public void testUpdateAuditlog_successfully() {
        givenAuditlog();
        log.setId(1L);
        when(auditLogRepository.existsById(any(long.class))).thenReturn(true);
        when(auditLogRepository.save(any(AuditLog.class))).thenReturn(log);
        auditlogService.updateAuditlog(log);
        verify(auditLogRepository).existsById(1L);
        verify(auditLogRepository).save(log);
    }

    @Test
    public void testUpdateAuditlog_throwsException() {
        givenAuditlog();
        log.setId(1L);
        when(auditLogRepository.existsById(any(long.class))).thenReturn(false);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> auditlogService.updateAuditlog(log));
    }

    private void thenAuditlogsReturned() {
        List<AuditLog> logok = auditlogService.findAll();
        Assertions.assertEquals(logok.size(), 2);
    }

    private void givenAuditlogs() {
        AuditLog log1 = new AuditLog();
        log1.setUserAction(UserActionType.CREATE_USER);
        log1.setUser("user");
        log1.setTimestamp(LocalDateTime.now());
        logs.add(log1);

        AuditLog log2 = new AuditLog();
        log2.setUserAction(UserActionType.CREATE_USER);
        log2.setUser("user");
        log2.setTimestamp(LocalDateTime.now());
        logs.add(log2);
    }

    private void givenAuditlog() {
        log = new AuditLog();
        log.setUserAction(UserActionType.CREATE_USER);
        log.setUser("user");
        log.setTimestamp(LocalDateTime.now());
    }

    private void thenAuditlogCreated() {
        log.setId(1L);
        auditlogService.createAuditLog(log);
        Assertions.assertEquals(log.getId(), 1L);
    }

}
