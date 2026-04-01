package com.cgiscp.admin.controller;

import com.cgiscp.admin.dto.response.ApiResponse;
import com.cgiscp.admin.dto.response.PageResult;
import com.cgiscp.admin.entity.User;
import com.cgiscp.admin.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "用户管理", description = "用户的增删改查接口")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "获取用户列表", description = "分页查询用户列表")
    public ApiResponse<PageResult<User>> getList(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.success(userService.getUserList(keyword, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取用户详情", description = "根据ID获取用户详情")
    public ApiResponse<User> getById(@PathVariable Long id) {
        return ApiResponse.success(userService.getUserById(id));
    }

    @PostMapping
    @Operation(summary = "创建用户", description = "创建新用户")
    public ApiResponse<User> create(@RequestBody User user) {
        return ApiResponse.success(userService.createUser(user));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新用户", description = "更新用户信息")
    public ApiResponse<User> update(@PathVariable Long id, @RequestBody User user) {
        return ApiResponse.success(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除用户", description = "删除用户")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ApiResponse.success();
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "修改用户状态", description = "启用或禁用用户")
    public ApiResponse<Void> updateStatus(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        userService.updateUserStatus(id, request.get("status"));
        return ApiResponse.success();
    }

    @PutMapping("/{id}/password")
    @Operation(summary = "重置密码", description = "重置用户密码")
    public ApiResponse<Void> resetPassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        userService.resetPassword(id, request.get("password"));
        return ApiResponse.success();
    }

    @PutMapping("/{id}/roles")
    @Operation(summary = "分配角色", description = "为用户分配角色")
    public ApiResponse<Void> assignRoles(@PathVariable Long id, @RequestBody Map<String, List<Long>> request) {
        userService.assignRoles(id, request.get("roleIds"));
        return ApiResponse.success();
    }
}
