package com.spring.study.controller;

import com.spring.study.domain.dto.ApiResult;
import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.dto.PostDto;
import com.spring.study.exception.NotFoundException;
import com.spring.study.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/post/")
public class PostController {

    private final PostService service;

    @GetMapping("list")
    public ModelAndView list(BaseSearchDto dto) {
        ModelAndView modelAndView = new ModelAndView("post/list");
        modelAndView.addObject("list", service.getAllPosts(dto));

        return modelAndView;
    }

    @GetMapping({"new", "{id}"})
    public ModelAndView edit(@PathVariable(name = "id", required = false) Long id) throws NotFoundException {
        ModelAndView modelAndView = new ModelAndView("post/edit");

        if (id != null)
            modelAndView.addObject("dto", service.findById(id));

        return modelAndView;
    }

    @PostMapping("ajax/save")
    public @ResponseBody ApiResult<Long> save(@RequestBody PostDto dto) {
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
    public @ResponseBody ApiResult<Long> delete(@RequestBody PostDto dto) throws NotFoundException {
        ApiResult<Long> result = new ApiResult<>(ApiResult.RESULT_CODE_OK);

        if (dto.getId() != null) {
            Long[] ids = {dto.getId()};
            dto.setIds(ids);
        }

        service.delete(dto.getIds());

        return result;
    }
}
