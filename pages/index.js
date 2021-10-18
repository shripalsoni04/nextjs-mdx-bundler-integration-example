import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrapper>
      <Link href="/articles/article-1" passHref={true}>
        <StyledLink>Article 1</StyledLink>
      </Link>
      <Link href="/articles/article-2" passHref={true}>
        <StyledLink>Article 2</StyledLink>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 24px;
`;

const StyledLink = styled.a`
  display: block;
  margin: 16px 0;
`;