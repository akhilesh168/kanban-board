import { fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import AddCard from '../components/AddCard';

const mockStore = createMockStore([]);

describe('<AddCard />', () => {
  let cardModalOpen;
  let setCardModalOpen;
  let titleTextBox;
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
    render(
      <AddCard
        cardModalOpen={cardModalOpen}
        setCardModalOpen={setCardModalOpen}
      />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>
            <MemoryRouter>{children}</MemoryRouter>
          </Provider>
        ),
      }
    );
    titleTextBox = screen.getByLabelText(/title/i);
  };

  beforeEach(() => {
    setCardModalOpen = jest.fn();
    cardModalOpen = true;
  });
  test('should check for default form initial labels for card form', () => {
    setup();
    expect(
      screen.getByText('Fill out the details for adding a new card.')
    ).toBeInTheDocument();
  });
  test('should load card into form', () => {
    setup();
    fireEvent.change(titleTextBox, { target: { value: 'Mission Impossible' } });
    expect(screen.getByLabelText(/title/i)).toHaveValue('Mission Impossible');
  });
});
