package com.spring.study.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.study.domain.entity.Account;
import com.spring.study.domain.entity.Post;
import com.spring.study.domain.entity.Reply;
import com.spring.study.domain.types.YNType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
public class PostDto {

    private Long id;
    private AccountDto account;
    private Long[] ids;
    private String title;
    private String content;
    private List<ReplyDto> replies = new ArrayList<>();
    private YNType activeYn;
    private YNType deleteYn;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;
    private AccountDto lastModifier;

    /**
     * 게시판 Dto 생성
     * @param p    게시판
     * @param isDetail 게시물 리스트 생성 여부
     */
    public PostDto(Post p, boolean isDetail) {
        this.id = p.getId();
        this.account = new AccountDto(p.getAccount());
        this.title = p.getTitle();
        this.content = p.getContent();
        this.createdAt = p.getCreatedAt();
        this.activeYn = p.getActiveYn();
        this.deleteYn = p.getDeleteYn();
        
        if (isDetail) {
            if (!CollectionUtils.isEmpty(p.getReplies()))
                this.replies = p.getReplies().stream().map(r -> new ReplyDto(r)).collect(Collectors.toList());

            this.updatedAt = p.getUpdatedAt();
            this.lastModifier = new AccountDto(p.getLastModifier());
        }

    }

    public PostDto(Post p) {
        this.id = p.getId();
        this.title = p.getTitle();
        this.content = p.getContent();
    }
}
