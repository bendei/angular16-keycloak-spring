package com.bende.persistence.model;

import com.bende.support.LocalDateTimeConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "AUDIT_LOG")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER")
    private String user;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "USERACTION")
    private UserActionType userAction;

    @NotNull
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "KONNEKTORID")
    private Konnektor konnektor;

    public String getUser() {
        return user;
    }

    public void setUser(final String user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Konnektor getKonnektor() {
        return konnektor;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(final LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setKonnektor(final Konnektor konnektor) {
        this.konnektor = konnektor;
    }

    public UserActionType getUserAction() {
        return userAction;
    }

    public void setUserAction(final UserActionType userAction) {
        this.userAction = userAction;
    }
}
