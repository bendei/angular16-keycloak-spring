package com.bende.service;

import com.bende.Application;
import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.AuditLog;
import com.bende.persistence.model.UserActionType;
import com.bende.persistence.repos.AuditLogRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional  // rolls back transaction after each Test -> no after cleanup is necessary (like deleteing entity after creating one in Test)
//@DataJpaTest
@SpringBootTest(classes = {Application.class, AuditlogService.class, AuditLogRepository.class})
public class AuditlogServiceDBTest {

    @Autowired
    AuditlogService service;

    @Autowired
    AuditLogRepository repo;

    AuditLog log;
    List<AuditLog> auditlogs = new ArrayList<>();

    @Test
    public void testGetAllAuditlogs() {
        List<AuditLog> logs = service.findAll();
        Assertions.assertEquals(logs.size(), 6);
    }

    @Test
    public void testCreateNewAuditlog() {
        givenAuditlog();
        Assertions.assertNull(log.getId());
        service.createAuditLog(log);
        Assertions.assertNotNull(log.getId());
    }

    @Test
    public void testUpdateAuditlog_successfully() {
        log = service.findAll().get(0);
        Long id = log.getId();
        log.setUser("pisti");
        service.updateAuditlog(log);
        if (service.findById(id).isPresent()) {
            AuditLog saved = service.findById(id).get();
            Assertions.assertEquals(saved.getId(), id);
            Assertions.assertEquals(saved.getUser(), "pisti");
        }
    }

    @Test
    public void testUpdateAuditlog_throwsException() {
        givenAuditlog();
        log.setId(1111L);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> service.updateAuditlog(log));
    }

    @Test
    public void testUpdatingMoreAuditlogs() {
        givenAuditlogs();
        whenAuditlogsSaved();
        thenAuditlogsChanged();
    }

    private void givenAuditlog() {
        log = new AuditLog();
        log.setUserAction(UserActionType.CREATE_USER);
        log.setUser("user");
        log.setTimestamp(LocalDateTime.now());
    }

    private void givenAuditlogs() {
        auditlogs = service.findAll();
    }

    private void whenAuditlogsSaved() {
        AuditLog log = auditlogs.get(0);
        log.setUserAction(UserActionType.KONNEKTOR_CREATE_USER);
        AuditLog log2 = auditlogs.get(1);
        log2.setUserAction(UserActionType.KONNEKTOR_DELETE_USER);
        service.updateAuditlogs(auditlogs);
        auditlogs.clear();
        givenAuditlogs();
    }

    private void thenAuditlogsChanged() {
        AuditLog log = auditlogs.get(0);
        Assertions.assertEquals(log.getUserAction(), UserActionType.KONNEKTOR_CREATE_USER);
        AuditLog log2 = auditlogs.get(1);
        Assertions.assertEquals(log2.getUserAction(), UserActionType.KONNEKTOR_DELETE_USER);
    }

}
