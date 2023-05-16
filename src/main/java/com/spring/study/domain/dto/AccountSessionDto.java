package com.spring.study.domain.dto;

import com.spring.study.domain.entity.Account;
import com.spring.study.domain.entity.AccountSession;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
public class AccountSessionDto {

    private Long id;
    private String accessToken;

    public AccountSessionDto(AccountSession a) {
        this.id = a.getId();
        //this.account = new AccountDto(a.getAccount());
        this.accessToken = a.getAccessToken();
    }
}
