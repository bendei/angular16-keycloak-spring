INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ('127.0.0.3', '213232', '11.03', '23.33.33', true, SYSTIMESTAMP);

INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ('127.0.0.4', '213234', '11.04', '23.33.34', false, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ('127.0.0.5', '213235', '11.05', '23.33.35', false, SYSTIMESTAMP);

INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('superuser', 2, 'USER_LOGIN', SYSTIMESTAMP);