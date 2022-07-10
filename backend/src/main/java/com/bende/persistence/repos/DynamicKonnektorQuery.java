package com.bende.persistence.repos;

import com.bende.persistence.model.Konnektor;
import java.time.LocalDateTime;
import java.util.List;

public interface DynamicKonnektorQuery {

    List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created);

}
