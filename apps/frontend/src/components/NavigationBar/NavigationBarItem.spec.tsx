import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBarItem from './NavigationBarItem';

it('should render', () => {
  const { container } = render(
    <BrowserRouter>
      <NavigationBarItem to="">Hey</NavigationBarItem>
    </BrowserRouter>,
  );

  const li = container.firstElementChild as HTMLLIElement;

  expect(li).toBeTruthy();
  expect(li.tagName).toBe('LI');

  const anchor = li.firstElementChild as HTMLAnchorElement;

  expect(anchor).toBeTruthy();
  expect(anchor.innerHTML).toBe('Hey');
  expect(anchor.classList.contains('border-b-2')).toBe(true);
});
