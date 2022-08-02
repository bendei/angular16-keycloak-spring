
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ('127.0.0.2', '213232', '21.11', '23.33.32', true, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ( '127.0.0.1', '213231', '11.01', '23.33.33', true, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ( '127.0.0.3', '213232', '11.03', '23.33.33', true, SYSTIMESTAMP);
INSERT INTO KONNEKTOR ( hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES ('127.0.0.4', '213234', '11.04', '23.33.34', false, SYSTIMESTAMP);
INSERT INTO KONNEKTOR (hostname, serialNumber, firmwareVersion, hardwareVersion, active, created) VALUES  ('127.0.0.5', '213235', '11.05', '23.33.35', false, SYSTIMESTAMP);

INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('bendeuser', 1, 'USER_LOGIN', SYSTIMESTAMP);
INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('bendeuser', 1, 'USER_LOGOUT', SYSTIMESTAMP);
INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('evauser', 1, 'USER_LOGIN', SYSTIMESTAMP);
INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('evauser', 2, 'USER_LOGIN', SYSTIMESTAMP);
INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('evauser', 2, 'USER_LOGOUT', SYSTIMESTAMP);
INSERT INTO AUDIT_LOG (user, konnektorid, useraction, timestamp) VALUES ('bendeuser', 2, 'ADD_NEW_KONNEKTOR', SYSTIMESTAMP);