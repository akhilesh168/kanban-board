import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import FallBack from '../components/FallBack';

const mockStore = createMockStore([]);

describe('<FallBack component testing />', () => {
  let labelBox, error, resetErrorBoundary;

  const setup = () => {
    error = {
      message: 'Error Occured',
    };
    resetErrorBoundary = jest.fn();
    const store = mockStore({});
    render(<FallBack error={error} resetErrorBoundary={resetErrorBoundary} />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      ),
    });

    labelBox = screen.getByText(/something went wrong:/i);
  };
  test('should render Fallback', () => {
    setup();
    expect(labelBox).toBeInTheDocument();
  });
});
