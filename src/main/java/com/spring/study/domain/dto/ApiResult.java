package com.spring.study.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class ApiResult<T> {

    final public static int RESULT_CODE_OK = 200;
    final public static int RESULT_CODE_NOT_FOUND = 404;
    final public static int RESULT_CODE_ERROR = 500;
    final public static int RESULT_CODE_INVALID = 501;
    final public static int RESULT_CODE_ALREADY = 502;

    final public static int RESULT_CODE_NOT_FOUND_PARAMETER = 601;
    final public static int RESULT_CODE_NO_DATA = 602;

    private int code;
    private String message;
    private T data;

    private Map<String, Object> validation = new HashMap<>();

    public ApiResult(int code) {
        this.code = code;
    }
    public ApiResult(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public void addValidation(String fieldName, String message) {
        validation.put(fieldName, message);
    }
}
