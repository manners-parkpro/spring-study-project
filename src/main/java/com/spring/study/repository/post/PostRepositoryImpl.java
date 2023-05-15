package com.spring.study.repository.post;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.spring.study.domain.dto.BaseSearchDto;
import com.spring.study.domain.entity.Post;
import com.spring.study.domain.entity.QPost;
import com.spring.study.domain.types.YNType;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private QPost post = QPost.post;

    @Override
    public List<Post> findPosts(BaseSearchDto dto) {

        return jpaQueryFactory.selectFrom(post)
                .where(post.activeYn.eq(YNType.Y), post.deleteYn.eq(YNType.N), containsSearch(dto.getSearch()))
                .limit(dto.getSize())
                .offset(dto.getOffset()) // Paging 처리를 위한 offset
                .orderBy(post.id.desc())
                .fetch();
    }

    private BooleanExpression containsSearch(String search) {
        if (StringUtils.isBlank(search))
            return null;

        return post.title.contains(search);
    }
}
