import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import PageNotFound from '../components/PageNotFound';

const mockStore = createMockStore([]);

describe('<TaskDetailsForm />', () => {
  let nameTextBox;
  const setup = () => {
    const store = mockStore({});
    render(<PageNotFound />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      ),
    });

    nameTextBox = screen.getByText(/Page Not found/i);
  };
  test('should click handleSubmit', () => {
    setup();
    expect(nameTextBox).toBeInTheDocument();
  });
});
