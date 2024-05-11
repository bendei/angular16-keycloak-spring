package com.bende.persistence.repos;

import com.bende.persistence.model.Konnektor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KonnektorRepository extends JpaRepository<Konnektor, Long>, DynamicKonnektorQuery {

    //@Query("SELECT k FROM Konnektor k WHERE k.active = true")
   //List<Konnektor> findAllActiveKonnektors();


    List<Konnektor> findAllByActiveTrue();

    // https://www.baeldung.com/spring-jpa-like-queries
    @Query("SELECT k FROM Konnektor k where k.active = true AND k.hostname LIKE %:hostname%")
    List<Konnektor> findKonnektorByActiveTrueAndHostnameContains(@Param("hostname") String hostname);


}
