import { render } from '@testing-library/react';
import HelloWorld from './HelloWorld';

test('renders learn react link', () => {
  const { getAllByTestId } = render(<HelloWorld />);

  const element = getAllByTestId('title');

  expect(element.length).toBe(1);
});
