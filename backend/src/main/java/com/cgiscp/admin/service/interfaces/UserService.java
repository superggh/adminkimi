package com.cgiscp.admin.service.interfaces;

import com.cgiscp.admin.dto.response.PageResult;
import com.cgiscp.admin.entity.User;
import org.springframework.data.domain.Pageable;

public interface UserService {

    PageResult<User> getUserList(String keyword, Pageable pageable);

    User getUserById(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    void updateUserStatus(Long id, Integer status);

    void resetPassword(Long id, String password);

    void assignRoles(Long id, java.util.List<Long> roleIds);
}
