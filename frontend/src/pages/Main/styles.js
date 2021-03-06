import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  a {
    color: black;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    height: 121px;
    width: 121px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 30px 0 30px 0;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      min-width: 100%;

      &::placeholder {
        color: black;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  margin: 5px 0 0;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }
`;
