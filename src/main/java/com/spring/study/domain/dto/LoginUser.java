package com.spring.study.domain.dto;

import com.spring.study.domain.entity.Account;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginUser {

    private Long id;
    private String username;
    private String email;
    private String tel;
    private String prefixEmail;
    private String suffixEmail;
    private String password;

    public LoginUser(Long id) {
        this.id = id;
    }
    public LoginUser(Account a) {
        this.id = a.getId();
        this.username = a.getUsername();
        this.email = a.getEmail();

        if (a.getEmail() != null) {
            String[] emailArray = email.split("@");
            this.prefixEmail = emailArray[0];
            this.suffixEmail = emailArray[1];
        }

        this.tel = a.getTel();
        this.password = a.getPassword();
    }
}
