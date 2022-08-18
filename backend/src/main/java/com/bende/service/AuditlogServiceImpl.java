package com.bende.service;

import com.bende.excpetions.ResourceNotFoundException;
import com.bende.persistence.model.AuditLog;
import com.bende.persistence.repos.AuditLogRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditlogServiceImpl implements AuditlogService {

    @Autowired
    AuditLogRepository repo;

    @Override
    public List<AuditLog> findAll() {
        return repo.findAll();
    }

    @Override
    public void createAuditLog(final AuditLog auditlog) {
        repo.save(auditlog);
    }

    @Override
    public void updateAuditlog(final AuditLog auditlog) {
        if (!repo.existsById(auditlog.getId())) {
            throw new ResourceNotFoundException("Auditlog mit dem id {id} nicht gefunden");
        }
        repo.save(auditlog);
    }

    public Optional<AuditLog> findById(long id) {
        return repo.findById(id);
    }

    @Override
    public void updateAuditlogs(final List<AuditLog> auditlogs) {
        if (!auditlogs.isEmpty()) {
            auditlogs.forEach( log -> updateAuditlog(log));
        }
    }
}
