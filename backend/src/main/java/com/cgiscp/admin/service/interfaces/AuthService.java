package com.cgiscp.admin.service.interfaces;

import com.cgiscp.admin.dto.request.LoginRequest;
import com.cgiscp.admin.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    void logout();

    LoginResponse refreshToken(String refreshToken);
}
