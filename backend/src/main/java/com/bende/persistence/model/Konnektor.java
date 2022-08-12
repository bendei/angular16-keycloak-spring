package com.bende.persistence.model;

import com.bende.support.LocalDateTimeConverter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDateTime;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "KONNEKTOR")
public class Konnektor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "KONNEKTORID")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @NotNull
    private String hostname;

    @Column(name = "SERIALNUMBER")
    private String serialNumber;

    @Column(name = "FIRMWAREVERSION")
    private String firmwareVersion;

    @Column(name = "HARDWAREVERSION")
    private String hardwareVersion;

    @Column(name = "ACTIVE")
    private boolean active;

    //@NotNull
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime created;

    @Column(name = "VALIDUNTIL")
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime validUntil;

    @OneToMany(mappedBy="konnektor", fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<AuditLog> auditlogs;


    public String getHostname() {
        return hostname;
    }

    public void setHostname(final String hostname) {
        this.hostname = hostname;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(final String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getFirmwareVersion() {
        return firmwareVersion;
    }

    public void setFirmwareVersion(final String firmwareVersion) {
        this.firmwareVersion = firmwareVersion;
    }

    public String getHardwareVersion() {
        return hardwareVersion;
    }

    public void setHardwareVersion(final String hardwareVersion) {
        this.hardwareVersion = hardwareVersion;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(final boolean active) {
        this.active = active;
    }

    public Set<AuditLog> getAuditlogs() {
        return auditlogs;
    }

    public void setAuditlogs(final Set<AuditLog> auditlogs) {
        this.auditlogs = auditlogs;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(final LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(final LocalDateTime validUntil) {
        this.validUntil = validUntil;
    }
}
