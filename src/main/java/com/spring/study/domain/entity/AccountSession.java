package com.spring.study.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static java.util.UUID.randomUUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String accessToken;

    @Builder
    public AccountSession(Account account) {
        this.account = account;
        this.accessToken = randomUUID().toString();
    }
}
