INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created, validUntil) VALUES ('127.0.0.3', '213232', '11.03', '23.33.33', true, CURRENT_TIMESTAMP, '2022-12-31 21:59:59');
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created, validUntil) VALUES ('127.0.0.4', '213234', '11.04', '23.33.34', false, CURRENT_TIMESTAMP, '2022-12-31 21:59:59');
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created, validUntil) VALUES ('127.0.0.5', '213235', '11.05', '23.33.35', false, CURRENT_TIMESTAMP, '2022-12-31 21:59:59');

INSERT INTO AUDITLOG (user, konnektorid, useraction, timestamp) VALUES ('superuser', 2, 'USER_LOGIN', CURRENT_TIMESTAMP);