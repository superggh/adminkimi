package com.cgiscp.admin.dto.response;

import com.cgiscp.admin.entity.User;
import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private String refreshToken;
    private UserInfo user;

    @Data
    public static class UserInfo {
        private Long id;
        private String username;
        private String nickname;
        private String email;
        private String phone;
        private String avatar;

        public static UserInfo fromUser(User user) {
            UserInfo info = new UserInfo();
            info.setId(user.getId());
            info.setUsername(user.getUsername());
            info.setNickname(user.getNickname());
            info.setEmail(user.getEmail());
            info.setPhone(user.getPhone());
            info.setAvatar(user.getAvatar());
            return info;
        }
    }
}
