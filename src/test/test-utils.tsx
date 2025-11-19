import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from '../theme/theme';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { renderWithProviders as render };
