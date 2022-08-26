package com.bende.service;

import com.bende.persistence.model.AuditLog;
import java.util.List;
import java.util.Optional;

public interface AuditlogService {

    List<AuditLog> findAll();

    void createAuditLog(AuditLog auditlog);

    void updateAuditlog(AuditLog auditlog);

    Optional<AuditLog> findById(long id);

    void updateAuditlogs(List<AuditLog> auditlogs);

    void createAuditLos(List<AuditLog> auditlogs);

}
