package com.spring.study.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static java.lang.Math.*;
@Getter
@Setter
@Builder
public class BaseSearchDto {

    private static final int MAX_SIZE = 5000;

    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 10;
    @Builder.Default
    private String searchType = "ALL";
    private String search;

    public long getOffset() {
        return (long) (max(1, page) - 1) * min(size, MAX_SIZE);
    }
}
