package com.cgiscp.admin.service.impl;

import com.cgiscp.admin.dto.response.PageResult;
import com.cgiscp.admin.entity.Brand;
import com.cgiscp.admin.repository.BrandRepository;
import com.cgiscp.admin.service.interfaces.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Override
    public PageResult<Brand> getBrandList(String keyword, String brandType, Integer year, Pageable pageable) {
        Page<Brand> page = brandRepository.findByConditions(keyword, brandType, year, pageable);
        return PageResult.of(page);
    }

    @Override
    public Brand getBrandById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("品牌不存在"));
    }

    @Override
    @Transactional
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    @Transactional
    public Brand updateBrand(Long id, Brand brand) {
        Brand existingBrand = getBrandById(id);
        existingBrand.setName(brand.getName());
        existingBrand.setBrandType(brand.getBrandType());
        existingBrand.setCategory(brand.getCategory());
        existingBrand.setRegion(brand.getRegion());
        existingBrand.setIndustry(brand.getIndustry());
        existingBrand.setFeature(brand.getFeature());
        existingBrand.setYear(brand.getYear());
        existingBrand.setSortOrder(brand.getSortOrder());
        return brandRepository.save(existingBrand);
    }

    @Override
    @Transactional
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}
