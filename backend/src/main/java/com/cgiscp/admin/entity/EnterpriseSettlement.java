package com.cgiscp.admin.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "enterprise_settlement")
public class EnterpriseSettlement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_no", nullable = false, unique = true, length = 50)
    private String applicationNo;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(name = "credit_code", nullable = false, length = 18)
    private String creditCode;

    @Column(name = "legal_person", nullable = false, length = 100)
    private String legalPerson;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "province", nullable = false, length = 50)
    private String province;

    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @Column(name = "address", nullable = false, length = 300)
    private String address;

    @Column(name = "industry", length = 50)
    private String industry;

    @Column(name = "business_scope", columnDefinition = "TEXT")
    private String businessScope;

    @Column(name = "registered_capital", length = 50)
    private String registeredCapital;

    @Column(name = "establish_date")
    private LocalDate establishDate;

    @Column(name = "employee_count", length = 20)
    private String employeeCount;

    @Column(name = "website", length = 200)
    private String website;

    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    @Column(name = "status")
    private Integer status = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
