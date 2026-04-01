package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    @Query("SELECT b FROM Brand b WHERE " +
           "(:keyword IS NULL OR b.name LIKE %:keyword%) AND " +
           "(:brandType IS NULL OR b.brandType = :brandType) AND " +
           "(:year IS NULL OR b.year = :year)")
    Page<Brand> findByConditions(@Param("keyword") String keyword,
                                  @Param("brandType") String brandType,
                                  @Param("year") Integer year,
                                  Pageable pageable);
}
