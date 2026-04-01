package com.cgiscp.admin.controller;

import com.cgiscp.admin.dto.response.ApiResponse;
import com.cgiscp.admin.dto.response.PageResult;
import com.cgiscp.admin.entity.Brand;
import com.cgiscp.admin.service.interfaces.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@Tag(name = "品牌管理", description = "品牌的增删改查接口")
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    @Operation(summary = "获取品牌列表", description = "分页查询品牌列表")
    public ApiResponse<PageResult<Brand>> getList(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String brandType,
            @RequestParam(required = false) Integer year,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.success(brandService.getBrandList(keyword, brandType, year, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取品牌详情", description = "根据ID获取品牌详情")
    public ApiResponse<Brand> getById(@PathVariable Long id) {
        return ApiResponse.success(brandService.getBrandById(id));
    }

    @PostMapping
    @Operation(summary = "创建品牌", description = "创建新品牌")
    public ApiResponse<Brand> create(@RequestBody Brand brand) {
        return ApiResponse.success(brandService.createBrand(brand));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新品牌", description = "更新品牌信息")
    public ApiResponse<Brand> update(@PathVariable Long id, @RequestBody Brand brand) {
        return ApiResponse.success(brandService.updateBrand(id, brand));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除品牌", description = "删除品牌")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ApiResponse.success();
    }

    @GetMapping("/types")
    @Operation(summary = "获取品牌类型", description = "获取所有品牌类型")
    public ApiResponse<Map<String, String>> getTypes() {
        Map<String, String> types = new HashMap<>();
        types.put("historical", "历史经典");
        types.put("modern", "时代优品");
        types.put("regional", "区域品牌");
        types.put("elderly", "适老化产品");
        types.put("maternal", "妇幼产品");
        types.put("disability", "助残产品");
        return ApiResponse.success(types);
    }
}
