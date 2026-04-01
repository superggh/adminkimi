package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.Policy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query("SELECT p FROM Policy p WHERE " +
           "(:keyword IS NULL OR p.title LIKE %:keyword%) AND " +
           "(:category IS NULL OR p.category = :category)")
    Page<Policy> findByConditions(@Param("keyword") String keyword,
                                   @Param("category") String category,
                                   Pageable pageable);
}
