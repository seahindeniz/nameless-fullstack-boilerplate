import { render } from '@testing-library/react';
import Footer from './Footer';

it('should render', () => {
  const { container } = render(<Footer />);

  const footer = container.firstElementChild as HTMLElement;

  expect(footer).toBeTruthy();
  expect(footer.tagName).toBe('FOOTER');
  expect(footer.classList.contains('relative')).toBe(true);
  expect(footer.childElementCount).toBe(1);

  const pElement = footer.firstElementChild as HTMLParagraphElement;

  expect(pElement).toBeTruthy();
  expect(pElement.tagName).toBe('P');
  expect(pElement.innerHTML).toContain('Copyrights');
  expect(pElement.classList.length).toBe(0);
});
