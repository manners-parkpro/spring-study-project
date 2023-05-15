package com.spring.study.repository.account;

import com.spring.study.domain.entity.AccountSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountSessionRepository extends JpaRepository<AccountSession, Long> {

    Optional<AccountSession> findAccountSessionByAccessToken(String accessToken);
}
