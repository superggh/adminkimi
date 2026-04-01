package com.cgiscp.admin.repository;

import com.cgiscp.admin.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findAllByDeletedAndStatusOrderBySortOrderAsc(Integer deleted, Integer status);

    List<Menu> findAllByParentIdAndDeletedAndStatusOrderBySortOrderAsc(Long parentId, Integer deleted, Integer status);
}
