package com.cgiscp.admin.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "menu_name", nullable = false, length = 50)
    private String menuName;

    @Column(name = "menu_code", nullable = false, length = 100)
    private String menuCode;

    @Column(name = "path", length = 255)
    private String path;

    @Column(name = "component", length = 255)
    private String component;

    @Column(name = "icon", length = 50)
    private String icon;

    @Column(name = "parent_id")
    private Long parentId = 0L;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @Column(name = "type", nullable = false)
    private Integer type;

    @Column(name = "external_link", length = 255)
    private String externalLink;

    @Column(name = "hidden")
    private Integer hidden = 0;

    @Column(name = "status", nullable = false)
    private Integer status = 1;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted")
    private Integer deleted = 0;

    @Transient
    private List<Menu> children = new ArrayList<>();
}
