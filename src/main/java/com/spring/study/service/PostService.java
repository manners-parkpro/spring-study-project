package com.spring.study.service;

import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.dto.LoginUser;
import com.spring.study.domain.dto.PostDto;
import com.spring.study.domain.entity.Account;
import com.spring.study.domain.entity.Post;
import com.spring.study.domain.types.YNType;
import com.spring.study.exception.NotFoundException;
import com.spring.study.exception.RequiredParamNonException;
import com.spring.study.exception.UserNotFoundException;
import com.spring.study.repository.account.AccountRepository;
import com.spring.study.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository repository;
    private final AccountRepository accountRepository;

    public List<PostDto> getAllPosts(BaseSearchDto dto) {
        return repository.findPosts(dto).stream().map(p -> new PostDto(p, false)).collect(Collectors.toList());
    }

    public List<PostDto> getPosts(List<Post> posts) {
        return posts.stream().map(p -> new PostDto(p, false)).collect(Collectors.toList());
    }

    public PostDto findById(Long id) throws NotFoundException {
        Optional<Post> optPost = repository.findById(id);

        if (optPost.isEmpty())
            throw new NotFoundException("Post not found", NotFoundException.POST_NOT_FOUND);

        return new PostDto(optPost.get());
    }

    @Transactional
    public Long save(PostDto dto, LoginUser loginUser) throws Exception {
        if (dto == null)
            throw new RequiredParamNonException("Dto must not be null");

        Account account = accountRepository.findById(loginUser.getId()).orElseThrow(() -> new UserNotFoundException("Post UserNotFoundException"));

        Post post;
        if (dto.getId() == null) {
            post = new Post();
            post.setAccount(account);
        } else {
            post = repository.findById(dto.getId()).orElseThrow(() -> new Exception("not found Post"));
            post.setLastModifier(account);
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());

        if (dto.getActiveYn() != null)
            post.setActiveYn(dto.getActiveYn());

        if (dto.getDeleteYn() != null)
            post.setDeleteYn(dto.getDeleteYn());

        repository.save(post);

        return post.getId();
    }

    @Transactional
    public void delete(Long[] ids, LoginUser loginUser) throws NotFoundException {
        if (ids != null) {
            List<Post> list = repository.findAllById(Arrays.asList(ids));
            if (CollectionUtils.isEmpty(list))
                throw new NotFoundException("Post not found", NotFoundException.POST_NOT_FOUND);

            Account account = accountRepository.findById(loginUser.getId()).orElseThrow(() -> new UserNotFoundException("Post Delete UserNotFoundException"));

            for (Post post : list) {
                post.setDeleteYn(YNType.Y);
                post.setLastModifier(account);
            }

            repository.saveAll(list);
        }
    }
}
