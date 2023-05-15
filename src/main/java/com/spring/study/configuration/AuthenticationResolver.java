package com.spring.study.configuration;

import com.spring.study.domain.dto.AccountDto;
import com.spring.study.domain.dto.LoginUser;
import com.spring.study.domain.entity.AccountSession;
import com.spring.study.exception.RequiredParamNonException;
import com.spring.study.exception.UserNotFoundException;
import com.spring.study.repository.account.AccountSessionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class AuthenticationResolver implements HandlerMethodArgumentResolver {

    private final AccountSessionRepository sessionRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        // 넘어온 Parameter Type이 정상적인지 확인
        return parameter.getParameterType().equals(LoginUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        /**
         * supportsParameter return true 시
         * 넘어온 Parameter를 Set.
         */

        String accessToken = webRequest.getHeader("Authorization");

        if (StringUtils.isBlank(accessToken))
            throw new RequiredParamNonException("ResolveArgument RequiredParamNonException");

        AccountSession accountSession = sessionRepository.findAccountSessionByAccessToken(accessToken).orElseThrow(() -> new UserNotFoundException("UserNotFoundException"));

        return new LoginUser(accountSession.getAccount().getId());
    }
}
