package com.cgiscp.admin.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "policy_number", length = 255)
    private String policyNumber;

    @Column(name = "source", length = 255)
    private String source;

    @Column(name = "category", nullable = false, length = 255)
    private String category;

    @Column(name = "date", length = 255)
    private String date;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Column(name = "content", columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "views")
    private Integer views = 0;

    @Column(name = "downloads")
    private Integer downloads = 0;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "file_url", length = 255)
    private String fileUrl;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
