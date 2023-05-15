package com.spring.study.domain.entity;

import com.spring.study.domain.types.YNType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Account extends BaseEntity {

    @Id
    @SequenceGenerator(name = "ACCOUNT_SEQ", sequenceName = "ACCOUNT_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ACCOUNT_SEQ")
    private Long id;
    @Column(length = 100)
    private String username;
    @Column(length = 100)
    private String email;
    @Column(length = 50)
    private String tel;
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'Y'")
    private YNType activeYn;
    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'N'")
    private YNType dormantYn;
    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'N'")
    private YNType deleteYn;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccountSession> sessions = new ArrayList<>();
    private LocalDateTime lastLoginAt;
    public AccountSession createSession() {
         AccountSession accountSession = AccountSession.builder()
                .account(this)
                .build();

        sessions.add(accountSession);

        return accountSession;
    }
}
