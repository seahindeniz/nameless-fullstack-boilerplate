import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { storage } from '@utils';
import MatchMediaMock from 'jest-matchmedia-mock';
import DarkModeToggleButton, {
  LightIcon,
  NightIcon,
  STORAGE_KEY,
} from './DarkModeToggleButton';

let matchMedia: MatchMediaMock;

function setColorScheme(mode: 'dark' | 'light') {
  matchMedia.useMediaQuery(`(prefers-color-scheme: ${mode})`);
}

describe('Testing dark mode toggle button', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    storage(STORAGE_KEY, null);
    matchMedia.clear();
    // @ts-expect-error https://github.com/dyakovk/jest-matchmedia-mock/pull/12
    matchMedia.currentMediaQuery = '';
  });

  afterAll(() => matchMedia.destroy());

  it('should render in light respecting to the color-scheme', () => {
    act(() => setColorScheme('light'));

    const { container } = render(<DarkModeToggleButton />);
    const button = container.querySelector('button');

    expect(button).toBeTruthy();

    if (!button) return; // just to pass TS warning

    expect(button.tagName).toBe('BUTTON');
    expect(button.type).toBe('button');

    const { container: nightIcon } = render(NightIcon());

    expect(button.innerHTML === nightIcon.innerHTML).toBe(true);
  });

  it('should render in dark respecting to the color-scheme', () => {
    act(() => setColorScheme('dark'));

    const { container } = render(<DarkModeToggleButton />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toBeTruthy();
    expect(button.tagName).toBe('BUTTON');
    expect(button.type).toBe('button');

    const { container: lightIcon } = render(LightIcon());

    expect(button.innerHTML === lightIcon.innerHTML).toBe(true);
  });

  it('should render in dark respecting to the stored dark mode value', () => {
    storage(STORAGE_KEY, true);

    render(<DarkModeToggleButton />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should click toggle button', () => {
    const { container } = render(<DarkModeToggleButton />);

    const button = container.firstElementChild as HTMLButtonElement;

    userEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    userEvent.click(button);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should change color-scheme from unset to dark', async () => {
    render(<DarkModeToggleButton />);

    act(() => setColorScheme('dark'));

    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it("should click toggle button to store state and DOM shouldn't be affected by changing color-scheme", async () => {
    const { container } = render(<DarkModeToggleButton />);

    const button = container.firstElementChild as HTMLButtonElement;

    userEvent.click(button);

    act(() => setColorScheme('dark'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
