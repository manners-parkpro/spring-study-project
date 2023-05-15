package com.spring.study.service;

import com.spring.study.domain.dto.AccountDto;
import com.spring.study.domain.entity.Account;
import com.spring.study.exception.UserNotFoundException;
import com.spring.study.repository.account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repository;

    public AccountDto findById(Long id) throws UserNotFoundException {
        Account account = repository.findById(id).orElseThrow(() -> new UserNotFoundException("UserNotFoundException"));
        return new AccountDto(account);
    }

    public AccountDto findAccountByUsernameAndPassword(AccountDto dto) throws UserNotFoundException {
        Account account = repository.findAccountByUsernameAndPassword(dto.getUsername(), dto.getPassword());

        if (account == null)
            throw new UserNotFoundException("UserNotFoundException");

        return new AccountDto(account);
    }

    @Transactional
    public AccountDto findAccountByEmailAndPassword(AccountDto dto) throws UserNotFoundException {
        Account account = repository.findAccountByEmailAndPassword(dto.getEmail(), dto.getPassword());

        if (account == null)
            throw new UserNotFoundException("UserNotFoundException");

        if (CollectionUtils.isEmpty(account.getSessions()))
            account.createSession();

        account.setLastLoginAt(LocalDateTime.now());
        repository.save(account);

        return new AccountDto(account);
    }
}
