package com.spring.study.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.study.domain.entity.Reply;
import com.spring.study.domain.types.YNType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class ReplyDto {

    private Long id;
    private Long[] ids;
    private String comment;
    private YNType deleteYn;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    public ReplyDto(Reply r) { this(r, false); }

    public ReplyDto(Reply r, boolean isDetail) {
        this.id = r.getId();
        this.comment = r.getComment();
        this.deleteYn = r.getDeleteYn();

        if (isDetail) {
            this.createdAt = r.getCreatedAt();
            this.updatedAt = r.getUpdatedAt();
        }
    }
}
