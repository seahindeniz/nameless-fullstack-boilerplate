import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

it('should render', () => {
  const content = 'Hey';
  const { container } = render(<NavigationBar>{content}</NavigationBar>);

  const nav = container.firstElementChild as HTMLElement;

  expect(nav).toBeTruthy();
  expect(nav.tagName).toBe('NAV');
  expect(nav.childElementCount).toBe(1);

  const ul = nav.firstElementChild as HTMLUListElement;

  expect(ul).toBeTruthy();
  expect(ul.tagName).toBe('UL');
  expect(ul.innerHTML).toBe(content);
  expect(ul.classList.contains('lg:flex')).toBe(true);
});
