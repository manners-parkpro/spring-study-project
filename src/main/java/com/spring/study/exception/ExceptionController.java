package com.spring.study.exception;

import com.spring.study.domain.dto.ApiResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestControllerAdvice
public class ExceptionController {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResult invalidRequestHandler(MethodArgumentNotValidException e) {
        log.error("MethodArgumentNotValidException Error : " + e);

        ApiResult response = new ApiResult(400, "잘못된 요청입니다.");
        for (FieldError fe : e.getFieldErrors()) {
            response.addValidation(fe.getField(), fe.getDefaultMessage());
        }

        return response;
    }

    /** Controller 에서 ApiResult code로 처리 하기 때문에 주석처리.
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ApiResult notFoundException(NotFoundException e) {
        log.error("NotFoundException Error : " + e);
        return new ApiResult(404, e.getMessage());
    }
    **/

    /** 최상위 Exception을 만들어서 Handling을 하는 방법도 좋다.
    @ResponseBody
    @ExceptionHandler(ParentException.class)
    public ResponseEntity<ErrorResponse> ParentException(ParentException e) {
        int statusCode = e.getStatusCode();

        ErrorResponse body = ErrorResponse.builder()
                .code(String.valueOf(statusCode))
                .message(e.getMessage())
                .validation(e.getValidation())
                .build();

        ResponseEntity<ErrorResponse> response = ResponseEntity.status(statusCode)
                .body(body);

        return response;
    }
    **/
}
