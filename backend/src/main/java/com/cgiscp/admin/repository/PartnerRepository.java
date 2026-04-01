package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.Partner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {

    @Query("SELECT p FROM Partner p WHERE " +
           "(:keyword IS NULL OR p.name LIKE %:keyword%)")
    Page<Partner> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
