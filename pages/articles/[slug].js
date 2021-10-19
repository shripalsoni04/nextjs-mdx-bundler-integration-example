import * as fs from 'fs';
import styled from 'styled-components';
import path from 'path';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { bundleMDXFile } from 'mdx-bundler';
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from 'react';
import Paragraph from '../../components/Paragraph';
import Table from '../../components/Table';

const ARTICLES_PATH = path.join(process.cwd(), 'content', 'articles');

const contentComponents = {
  p: Paragraph,
  table: Table
};

export default function ArticlePage({ frontMatter, code }) {
  // From performance perspective, it is better to create new MDXComponent only if `code` is changed. So, wrapping it in `useMemo` hook. 
  const MDXComponent = useMemo(() => {
    return getMDXComponent(code);
  }, [code]);

  return (
    <Wrapper>
      <h1>{frontMatter.title}</h1>
      <main>
        <MDXComponent components={contentComponents}/>
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
  const config = {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
      ];
      return options;
    }
  };

  const { code, frontmatter } = await bundleMDXFile(articlePath, config);

  return {
    props: {
      frontMatter: frontmatter,
      code
    }
  }
}

const Wrapper = styled.div`
  padding: 24px;
`;