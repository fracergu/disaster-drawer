import 'jest-styled-components'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../Button'

describe('GIVEN: NeonButton', () => {
  test('THEN: should render correctly', () => {
    render(<Button label="Click me" />)
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  test('THEN: should render with correct styles', () => {
    render(<Button label="Click me" />)
    const button = screen.getByText('Click me')
    expect(button).toHaveStyle(`
        position: relative;
        width: fit-content;
        `)
  })

  test('THEN: should render with correct primary styles', () => {
    render(
      <Button
        label="Click me"
        variant="primary"
      />
    )
    const background = screen.getByTestId('neon-button-background')
    expect(background).toHaveStyleRule(
      'background',
      'linear-gradient(var(--angle), magenta, cyan)'
    )
  })

  test('THEN: should render with correct outline styles', () => {
    render(
      <Button
        label="Click me"
        variant="outline"
      />
    )
    const background = screen.getByTestId('neon-button-background')
    expect(background).toHaveStyleRule(
      'background',
      'conic-gradient(from var(--angle), magenta, cyan, magenta) border-box'
    )
  })

  test('THEN: should render with correct primary hover styles', async () => {
    render(
      <Button
        label="Click me"
        variant="primary"
      />
    )
    const button = screen.getByText('Click me')
    const background = screen.getByTestId('neon-button-background')
    await userEvent.hover(button)
    expect(background).toHaveStyleRule(
      'animation',
      '1s rotatePrimaryBg forwards'
    )
  })

  test('THEN: should render with correct outline hover styles', async () => {
    render(
      <Button
        label="Click me"
        variant="outline"
      />
    )
    const button = screen.getByText('Click me')
    const background = screen.getByTestId('neon-button-background')
    await userEvent.hover(button)
    expect(background).toHaveStyleRule(
      'animation',
      '1s rotateOutlineBg linear infinite'
    )
  })

  describe('WHEN: button atributtes are passed', () => {
    test('THEN: should render with correct onClick', async () => {
      const onClick = vi.fn()
      render(
        <Button
          label="Click me"
          onClick={onClick}
        />
      )
      const button = screen.getByText('Click me')
      await userEvent.click(button)
      expect(onClick).toHaveBeenCalled()
    })

    test('THEN: should render with correct disabled', async () => {
      render(
        <Button
          label="Click me"
          disabled
        />
      )
      const button = screen.getByText('Click me')
      expect(button).toBeDisabled()
    })

    test('THEN: should render with correct onMouseEnter', async () => {
      const onMouseEnter = vi.fn()
      render(
        <Button
          label="Click me"
          onMouseEnter={onMouseEnter}
        />
      )
      const button = screen.getByText('Click me')
      await userEvent.hover(button)
      expect(onMouseEnter).toHaveBeenCalled()
    })

    test('THEN: should render with correct onMouseLeave', async () => {
      const onMouseLeave = vi.fn()
      render(
        <Button
          label="Click me"
          onMouseLeave={onMouseLeave}
        />
      )
      const button = screen.getByText('Click me')
      await userEvent.unhover(button)
      expect(onMouseLeave).toHaveBeenCalled()
    })

    test('THEN: should render with correct type', async () => {
      render(
        <Button
          label="Click me"
          type="submit"
        />
      )
      const button = screen.getByText('Click me')
      expect(button).toHaveAttribute('type', 'submit')
    })

    test('THEN: should render with correct aria-label', async () => {
      render(
        <Button
          label="Click me"
          aria-label="click-me"
        />
      )
      const button = screen.getByText('Click me')
      expect(button).toHaveAttribute('aria-label', 'click-me')
    })
  })
})
