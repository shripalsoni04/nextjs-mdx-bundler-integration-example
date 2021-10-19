import styled from 'styled-components';

export default function Paragraph({ children }) {
  return (
    <StyledParagraph>{children}</StyledParagraph>
  )
}

const StyledParagraph = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.25em;
  margin-top: 0;
  line-height: 1.6;
`;