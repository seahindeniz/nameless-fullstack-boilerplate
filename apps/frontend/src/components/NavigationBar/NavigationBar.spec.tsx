import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import MatchMediaMock from 'jest-matchmedia-mock';
import NavigationBar from './NavigationBar';

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterAll(() => matchMedia.destroy());

it('should render', () => {
  const { container } = render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>,
  );

  const nav = container.querySelector(':scope > nav') as HTMLElement;

  expect(nav).toBeTruthy();
  expect(nav.tagName).toBe('NAV');
  expect(nav.childElementCount).toBe(1);

  const ul = nav.firstElementChild as HTMLUListElement;

  expect(ul).toBeTruthy();
  expect(ul.tagName).toBe('UL');
  expect(ul.classList.contains('lg:flex')).toBe(true);
});

it('should click on Menu button', () => {
  const { container } = render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>,
  );

  const menuButton = container.querySelector(
    ':scope > button',
  ) as HTMLButtonElement;

  expect(menuButton).toBeTruthy();
  expect(menuButton.tagName).toBe('BUTTON');

  const navElement = container.querySelector(
    ':scope > nav',
  ) as HTMLButtonElement;

  expect(navElement.classList.contains('hidden')).toBe(true);
  userEvent.click(menuButton);

  expect(navElement).toBeTruthy();
  expect(navElement.tagName).toBe('NAV');
  expect(navElement.classList.contains('hidden')).toBe(false);
});

it('should click on Home link', () => {
  const { container } = render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>,
  );

  const menuButton = container.querySelector(
    ':scope > button',
  ) as HTMLButtonElement;
  const navElement = container.querySelector(
    ':scope > nav',
  ) as HTMLButtonElement;
  const homeAnchor = navElement.querySelector(
    ':scope > ul > li:first-child > a',
  ) as HTMLButtonElement;

  expect(navElement.classList.contains('hidden')).toBe(true);
  userEvent.click(menuButton);

  expect(navElement.classList.contains('hidden')).toBe(false);
  userEvent.click(homeAnchor);

  expect(navElement.classList.contains('hidden')).toBe(true);
});
