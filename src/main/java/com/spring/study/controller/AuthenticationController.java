package com.spring.study.controller;

import com.spring.study.domain.dto.AccountDto;
import com.spring.study.domain.dto.ApiResult;
import com.spring.study.exception.UserNotFoundException;
import com.spring.study.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/")
public class LoginController {

    private final AccountService service;

    @PostMapping("cookie-login")
    public ResponseEntity cookieLogin(@RequestBody AccountDto dto) throws UserNotFoundException {

        AccountDto data = service.findAccountByEmailAndPassword(dto);

        // Make Cookie
        ResponseCookie cookie = ResponseCookie.from("SESSION", data.getSessions().get(0).getAccessToken())
                .domain("localhost") // todo : 환경에 따른 분리 필요
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(Duration.ofDays(30))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok().build();
    }

    @Deprecated
    public ApiResult deprecated(@RequestBody AccountDto dto) throws UserNotFoundException {
        ApiResult<AccountDto> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        AccountDto data = service.findAccountByEmailAndPassword(dto);
        result.setData(data);

        return result;
    }

    @PostMapping("login")
    public ApiResult login(@RequestBody AccountDto dto) throws UserNotFoundException {
        ApiResult<AccountDto> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        AccountDto data = service.findAccountByEmailAndPassword(dto);
        result.setData(data);

        return result;
    }
}