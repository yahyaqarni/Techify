import styled, { css } from 'styled-components';
import { primary } from '@/lib/colors';

export const ButtonStyle = css`
  flex: 0.5;
  border: 0;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  svg {
    height: 17px;
    margin-right: 5px;
  }
  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
      
      padding: .5rem, .5rem;
    `}
  ${props =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${props =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${props =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${props =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${props =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}
  ${props =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
  ${props =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    ${props =>
      props.primary &&
      !props.outline &&
      css`
        background-color: ${primary};
        color: #fff;
      `}
    ${props =>
      props.white &&
      !props.outline &&
      css`
        background-color: #f1f1f1;
        color: #000;
      `}
    ${props =>
      props.black &&
      !props.outline &&
      css`
        background-color: #333;
        color: #fff;
      `}

      background-color: ${primary};
      color: white;
  }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
