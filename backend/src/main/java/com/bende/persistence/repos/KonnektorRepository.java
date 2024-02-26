package com.bende.persistence.repos;

import com.bende.persistence.model.Konnektor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface KonnektorRepository extends JpaRepository<Konnektor, Long>, DynamicKonnektorQuery {

    @Query("SELECT k FROM Konnektor k WHERE k.active = true")
    List<Konnektor> findAllActiveKonnektors();

}
