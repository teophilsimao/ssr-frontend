import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Create New Document link', () => {
  render(<App />);
  const linkElement = screen.getByText(/create new document/i);
  expect(linkElement).toBeInTheDocument();
});
