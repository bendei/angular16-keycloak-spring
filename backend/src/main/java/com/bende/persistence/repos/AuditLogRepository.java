package com.bende.persistence.repos;

import com.bende.persistence.model.AuditLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long>  {

    //List<AuditLog> findAuditLogsByKonnektorId(Long id);

}
