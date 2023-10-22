import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import PageNotFound from '../components/PageNotFound';

const mockStore = createMockStore([]);
const mockUseLocationValue = {
  pathname: '/taskDetails',
  search: '',
  hash: '',
  state: { cardTitle: 'UnAssigned', name: 'Mission Impossible' },
};

describe('<TaskDetailsForm />', () => {
  let nameTextBox;
  const tasks = {
    tasks: {
      ToDo: [],
      'In Progress': [],
      Done: [],
      UnAssigned: [
        {
          name: 'Mission Impossible',
          description: 'This is really difficult',
          deadline: new Date(),
          imgData: '',
          isFavorite: false,
        },
      ],
      'IN Review': [],
    },
  };
  const setup = () => {
    const store = mockStore(tasks);
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
      }),
    }));

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
