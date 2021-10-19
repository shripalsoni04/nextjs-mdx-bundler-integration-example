import styled from 'styled-components';

export default function Table({ children }) {
  return (
    <StyledTable>{children}</StyledTable>
  )
}

const StyledTable = styled.table`
  margin-bottom: 30px;
  border-collapse: collapse;

  th, td {
    border: 1px solid black;
    padding: 8px;
  }
`;