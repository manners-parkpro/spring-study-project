package com.spring.study.repository.post;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.entity.Post;
import com.spring.study.domain.entity.QPost;
import com.spring.study.domain.types.YNType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Post> findPosts(BaseSearchDto dto) {
        QPost post = QPost.post;

        return jpaQueryFactory.selectFrom(post)
                .where(post.activeYn.eq(YNType.Y), post.deleteYn.eq(YNType.N))
                .limit(dto.getSize())
                .offset(dto.getOffset()) // Paging 처리를 위한 offset
                .orderBy(post.id.desc())
                .fetch();
    }
}
