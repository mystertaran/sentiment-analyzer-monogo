import { fireEvent, render } from '@testing-library/react';

import { Button } from '../Button/Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
