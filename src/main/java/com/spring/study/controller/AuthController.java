package com.spring.study.controller;

import com.spring.study.domain.dto.AccountDto;
import com.spring.study.domain.dto.ApiResult;
import com.spring.study.exception.UserNotFoundException;
import com.spring.study.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/")
public class AuthController {

    private final AccountService service;

    @PostMapping("login")
    public ApiResult login(@RequestBody AccountDto dto) throws UserNotFoundException {
        ApiResult<AccountDto> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        AccountDto data = service.findAccountByEmailAndPassword(dto);
        result.setData(data);

        return result;
    }
}
