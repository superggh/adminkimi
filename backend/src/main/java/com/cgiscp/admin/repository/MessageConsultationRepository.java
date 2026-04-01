package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.MessageConsultation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageConsultationRepository extends JpaRepository<MessageConsultation, Long> {

    @Query("SELECT m FROM MessageConsultation m WHERE " +
           "(:keyword IS NULL OR m.name LIKE %:keyword% OR m.phone LIKE %:keyword% OR m.subject LIKE %:keyword%) AND " +
           "(:status IS NULL OR m.status = :status)")
    Page<MessageConsultation> findByConditions(@Param("keyword") String keyword,
                                                @Param("status") Integer status,
                                                Pageable pageable);
}
