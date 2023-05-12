package com.spring.study.domain.dto;

import com.spring.study.domain.entity.Post;
import com.spring.study.domain.types.YNType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class PostDto {

    private Long id;
    private Long[] ids;
    private String title;
    private String content;
    private YNType activeYn;
    private YNType deleteYn;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime updatedAt;

    /**
     * 게시판 Dto 생성
     * @param p    게시판
     * @param isDetail 게시물 리스트 생성 여부
     */
    public PostDto(Post p, boolean isDetail) {
        this.id = p.getId();
        this.title = p.getTitle();
        this.content = p.getContent();
        this.createdAt = p.getCreatedAt();
        this.activeYn = p.getActiveYn();
        this.deleteYn = p.getDeleteYn();
        
        if (isDetail)
            this.updatedAt = p.getUpdatedAt();
    }

    public PostDto(Post p) {
        this.id = p.getId();
        this.title = p.getTitle();
        this.content = p.getContent();
    }
}
