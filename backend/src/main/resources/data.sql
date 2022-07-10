
INSERT INTO EMPLOYEES (id, email, first_name, last_name) VALUES (1, 'abc1@gmail.com', 'Lokesh', 'Gupta');
INSERT INTO EMPLOYEES (id, email, first_name, last_name) VALUES (2, 'abc2@gmail.com', 'Lokesh', 'Gupta');
INSERT INTO EMPLOYEES (id, email, first_name, last_name) VALUES (3, 'abc3@gmail.com', 'Lokesh', 'Gupta');

INSERT INTO KONNEKTOR (konnektorid, hostname, serialNumber, firmwareVersion, hardwareVersion, active, created)
VALUES (2, '127.0.0.2', '213232', '21.11', '23.33.32', true, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (konnektorid, hostname, serialNumber, firmwareVersion, hardwareVersion, active, created)
    VALUES (1, '127.0.0.1', '213231', '11.01', '23.33.33', true, SYSTIMESTAMP);

INSERT INTO KONNEKTOR (konnektorid, hostname, serialNumber, firmwareVersion, hardwareVersion, active, created)
VALUES (3, '127.0.0.3', '213232', '11.03', '23.33.33', true, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (konnektorid, hostname, serialNumber, firmwareVersion, hardwareVersion, active, created)
VALUES (4, '127.0.0.4', '213234', '11.04', '23.33.34', false, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (konnektorid, hostname, serialNumber, firmwareVersion, hardwareVersion, active, created)
VALUES (5, '127.0.0.5', '213235', '11.05', '23.33.35', false, SYSTIMESTAMP);

INSERT INTO AUDIT_LOG (id, user, konnektorid, useraction, timestamp) VALUES (1, 'bendeuser', 1, 'USER_LOGIN', SYSTIMESTAMP);