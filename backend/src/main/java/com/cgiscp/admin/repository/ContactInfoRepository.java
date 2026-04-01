package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long> {

    List<ContactInfo> findAllByOrderBySortOrderAsc();
}
