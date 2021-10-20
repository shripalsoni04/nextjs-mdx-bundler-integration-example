import styled from 'styled-components';
import JSConfetti from 'js-confetti'
import { useEffect, useRef } from 'react';

export default function Celebrate() {
  const confettiRef = useRef();

  useEffect(() => {
    confettiRef.current = new JSConfetti();
  }, []);

  const handleClick = () => {
    confettiRef.current.addConfetti();
  };

  return (
    <Wrapper>
      <CelebrationButton onClick={handleClick}>Celebrate</CelebrationButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
`;

const CelebrationButton = styled.button`
  color: #fff;
  background-color: ${props => props.theme.colors.accent};
  padding: 16px 24px;
  border: 0;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 5px;
`;