import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MatchMediaMock from 'jest-matchmedia-mock';
import Shell from './Shell';

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterAll(() => matchMedia.destroy());

it('should render', () => {
  const { container } = render(
    <BrowserRouter>
      <Shell />
    </BrowserRouter>,
  );

  const subContainer = container.firstElementChild as HTMLDivElement;

  expect(subContainer).toBeTruthy();
  expect(subContainer.tagName).toBe('DIV');
  expect(subContainer.classList.contains('bg-gray-200')).toBe(true);
});
