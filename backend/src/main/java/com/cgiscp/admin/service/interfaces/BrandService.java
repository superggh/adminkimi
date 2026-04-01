package com.cgiscp.admin.service.interfaces;

import com.cgiscp.admin.dto.response.PageResult;
import com.cgiscp.admin.entity.Brand;
import org.springframework.data.domain.Pageable;

public interface BrandService {

    PageResult<Brand> getBrandList(String keyword, String brandType, Integer year, Pageable pageable);

    Brand getBrandById(Long id);

    Brand createBrand(Brand brand);

    Brand updateBrand(Long id, Brand brand);

    void deleteBrand(Long id);
}
