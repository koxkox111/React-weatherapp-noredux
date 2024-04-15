import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  top: 60px;
  right: 20px;
  position: absolute;
  transition: all 1s ease;
`