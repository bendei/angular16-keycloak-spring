package com.bende.persistence.repos;

import com.bende.persistence.model.Konnektor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.apache.commons.lang3.StringUtils;

public class DynamicKonnektorQueryImpl implements DynamicKonnektorQuery {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Konnektor> filterKonnektors(String hostname, String serialNumber, String firmwareVersion, String hardwareVersion, LocalDateTime created) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<Konnektor> cq=cb.createQuery(Konnektor.class);
        Root<Konnektor> konnRoot = cq.from(Konnektor.class);

        //konnRoot.join("auditlogs");

        List<Predicate> predicates = new ArrayList<>();

        if (StringUtils.isNotEmpty(hostname)) {
            predicates.add(cb.equal(konnRoot.get("hostname"), hostname));
        }
        if (StringUtils.isNotEmpty(serialNumber)) {
            predicates.add(cb.equal(konnRoot.get("serialNumber"), serialNumber));
        }
        if (StringUtils.isNotEmpty(firmwareVersion)) {
            predicates.add(cb.equal(konnRoot.get("firmwareVersion"), firmwareVersion));
        }
        if (StringUtils.isNotEmpty(hardwareVersion)) {
            predicates.add(cb.equal(konnRoot.get("hardwareVersion"), hardwareVersion));
        }
        if (created != null) {
            predicates.add(cb.lessThanOrEqualTo(konnRoot.get("created"), created));
        }

        if (!predicates.isEmpty()) {
            cq.where(predicates.toArray(Predicate[]::new));
        }

        cq.orderBy(cb.desc(konnRoot.get("serialNumber")), cb.desc(konnRoot.get("firmwareVersion")));
        List<Konnektor> konnektors = entityManager.createQuery(cq).getResultList();
        return konnektors;
    }
}
