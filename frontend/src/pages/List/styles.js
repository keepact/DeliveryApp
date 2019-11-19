import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const DeliveryTable = styled.table`
  width: 100%;

  @media (max-width: 600px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
  }
`;

export const PageActions = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  max-width: 720px;
  margin: 50px auto 0;

  span {
    font-weight: bold;
    font-size: 18px;
  }

  button {
    background: #3b9eff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;

    &[disabled] {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &[disabled]:hover {
      opacity: 0.35;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;
