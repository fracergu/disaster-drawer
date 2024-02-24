import { useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: relative;
  width: fit-content;
`

const outlineStyles = css<{ $isHovered: boolean }>`
  border: 2px solid transparent;
  background: conic-gradient(from var(--angle), magenta, cyan, magenta)
    border-box;
  mask: linear-gradient(#fff 0 0) padding-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  @keyframes rotateOutlineBg {
    to {
      --angle: 405deg;
    }
  }

  ${({ $isHovered }) =>
    $isHovered && 'animation: 1s rotateOutlineBg linear infinite'}
`

const primaryStyles = css<{ $isHovered: boolean }>`
  background: linear-gradient(var(--angle), magenta, cyan);
  animation-fill-mode: forwards;

  @keyframes rotatePrimaryBg {
    from {
      --angle: 45deg;
    }
    to {
      --angle: 225deg;
    }
  }

  ${({ $isHovered }) => $isHovered && `animation: 1s rotatePrimaryBg forwards`}
`

const Background = styled.div<{
  $variant: 'primary' | 'outline'
  $isHovered: boolean
}>`
  --angle: 45deg;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  cursor: pointer;

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  ${({ $variant }) => ($variant === 'outline' ? outlineStyles : primaryStyles)}
`

const StyledButton = styled.button<{ $variant: 'primary' | 'outline' }>`
  position: relative;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 25px;
  border: none;
  background: ${({ $variant }) =>
    $variant === 'outline' ? 'white' : 'transparent'};
  color: ${({ $variant }) => ($variant === 'outline' ? '#333' : 'white')};
  cursor: pointer;
  box-sizing: border-box;
  margin: 2px;
  text-transform: uppercase;
`

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline'
  label?: string
}

export const Button = ({
  variant = 'primary',
  label,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouse = (
    event: React.MouseEvent<HTMLButtonElement>,
    hoverState: boolean
  ) => {
    setIsHovered(hoverState)
    if (onMouseEnter && hoverState) {
      onMouseEnter(event)
    } else if (onMouseLeave && !hoverState) {
      onMouseLeave(event)
    }
  }
  return (
    <Container data-testid="neon-button-container">
      <Background
        data-testid="neon-button-background"
        $variant={variant}
        $isHovered={isHovered}
      ></Background>
      <StyledButton
        data-testid="neon-button"
        $variant={variant}
        onMouseEnter={event => handleMouse(event, true)}
        onMouseLeave={event => handleMouse(event, false)}
        {...props}
      >
        {label}
      </StyledButton>
    </Container>
  )
}
