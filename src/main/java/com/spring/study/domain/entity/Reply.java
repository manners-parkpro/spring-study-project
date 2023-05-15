package com.spring.study.domain.entity;

import com.spring.study.domain.types.YNType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Reply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @Lob
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'N'")
    private YNType deleteYn;
}
