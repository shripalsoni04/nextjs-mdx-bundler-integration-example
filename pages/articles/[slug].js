import * as fs from 'fs';
import styled from 'styled-components';
import path from 'path';
import matter from "gray-matter";
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from 'react';

const ARTICLES_PATH = path.join(process.cwd(), 'content', 'articles');

export default function ArticlePage({ frontMatter, code }) {
  // From performance perspective, it is better to create new MDXComponent only if `code` is changed. So, wrapping it in `useMemo` hook. 
  const MDXComponent = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  return (
    <Wrapper>
      <h1>{frontMatter.title}</h1>
      <main>
        <MDXComponent />
      </main>
    </Wrapper>
  );
}

export function getStaticPaths() {
  const lstFileName = fs.readdirSync(ARTICLES_PATH);
  const paths = lstFileName.map(fileName => ({
    params: {
      slug: fileName.replace('.mdx', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const articlePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const fileContent = fs.readFileSync(articlePath);
  const { data, content } = matter(fileContent.toString());
  const { code } = await bundleMDX(content);

  return {
    props: {
      frontMatter: data,
      content,
      code
    }
  }
}

const Wrapper = styled.div`
  padding: 24px;
`;