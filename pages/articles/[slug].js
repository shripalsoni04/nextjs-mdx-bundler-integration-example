import * as fs from 'fs';
import styled from 'styled-components';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { bundleMDXFile } from 'mdx-bundler';
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
  const config = {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
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