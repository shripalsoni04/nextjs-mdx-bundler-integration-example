import * as fs from 'fs';
import styled from 'styled-components';
import path from 'path';
import matter from "gray-matter";

const ARTICLES_PATH = path.join(process.cwd(), 'content', 'articles');

export default function ArticlePage({ frontMatter, content }) {
  return (
    <Wrapper>
      <h1>{frontMatter.title}</h1>
      <div>
        {content}
      </div>
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

export function getStaticProps({ params }) {
  const { slug } = params;
  const articlePath = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const fileContent = fs.readFileSync(articlePath);
  const { data, content } = matter(fileContent.toString());
  return {
    props: {
      frontMatter: data,
      content
    }
  }
}

const Wrapper = styled.div`
  padding: 24px;
`;