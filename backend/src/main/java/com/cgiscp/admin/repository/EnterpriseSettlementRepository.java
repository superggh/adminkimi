package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.EnterpriseSettlement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EnterpriseSettlementRepository extends JpaRepository<EnterpriseSettlement, Long> {

    @Query("SELECT e FROM EnterpriseSettlement e WHERE " +
           "(:keyword IS NULL OR e.companyName LIKE %:keyword% OR e.applicationNo LIKE %:keyword%) AND " +
           "(:status IS NULL OR e.status = :status)")
    Page<EnterpriseSettlement> findByConditions(@Param("keyword") String keyword,
                                                 @Param("status") Integer status,
                                                 Pageable pageable);
}
