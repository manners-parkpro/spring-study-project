package com.spring.study.controller;

import com.spring.study.domain.dto.ApiResult;
import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.dto.PostDto;
import com.spring.study.exception.NotFoundException;
import com.spring.study.exception.RequiredParamNonException;
import com.spring.study.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/post/")
public class PostController {

    private final PostService service;

    @GetMapping("list")
    public ApiResult<List<PostDto>> list(BaseSearchDto dto) {
        ApiResult<List<PostDto>> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);
        result.setData(service.getAllPosts(dto));

        return result;
    }

    @GetMapping("{id}")
    public PostDto edit(@PathVariable Long id) throws NotFoundException, RequiredParamNonException {

        if (id == null)
            throw new RequiredParamNonException("RequiredParamNonException");

        return service.findById(id);
    }

    @PostMapping("ajax/save")
    public ApiResult<Long> save(@RequestBody PostDto dto) {
        ApiResult<Long> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        try {
            Long id = service.save(dto);
            result.setData(id);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            result.setCode(ApiResult.RESULT_CODE_ERROR);
        }

        return result;
    }

    @RequestMapping("ajax/delete")
    public ApiResult<Long> delete(@RequestBody PostDto dto) throws NotFoundException {
        ApiResult<Long> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        if (dto.getId() != null) {
            Long[] ids = {dto.getId()};
            dto.setIds(ids);
        }

        service.delete(dto.getIds());

        return result;
    }
}
