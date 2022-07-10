package com.bende.persistence.model;

import com.bende.support.LocalDateTimeConverter;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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

    @ManyToOne(fetch = FetchType.LAZY)
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
