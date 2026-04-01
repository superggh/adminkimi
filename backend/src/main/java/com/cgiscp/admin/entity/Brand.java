package com.cgiscp.admin.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "brands")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "brand_type", nullable = false, length = 50)
    private String brandType;

    @Column(name = "category", length = 100)
    private String category;

    @Column(name = "region", length = 100)
    private String region;

    @Column(name = "industry", length = 100)
    private String industry;

    @Column(name = "feature", length = 255)
    private String feature;

    @Column(name = "year", nullable = false)
    private Integer year = 2025;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
