import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
`;

export const DeliveryTable = styled.table`
  width: 100%;

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
