package com.spring.study.domain.entity;

import com.spring.study.domain.types.YNType;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Post extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;
    private String title;
    @Lob
    private String content;
    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'Y'")
    private YNType activeYn;
    @Enumerated(EnumType.STRING)
    @Column(length = 1, columnDefinition = "char(1) default 'N'")
    private YNType deleteYn;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "LAST_MODIFIER_ID")
    private Account lastModifier;
}
