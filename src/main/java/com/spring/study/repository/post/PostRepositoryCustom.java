package com.spring.study.repository.post;

import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.entity.Post;

import java.util.List;

public interface PostRepositoryCustom {

    List<Post> findPosts(BaseSearchDto dto);
}
