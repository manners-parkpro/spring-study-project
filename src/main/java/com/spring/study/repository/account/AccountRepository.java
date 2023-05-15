package com.spring.study.repository.account;

import com.spring.study.domain.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Account findAccountByUsernameAndPassword(String username, String password);

    Account findAccountByEmailAndPassword(String email, String password);
}
