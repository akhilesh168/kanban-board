import { fireEvent, render, screen } from '@testing-library/react';

import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import AddTask from '../components/AddTask';

const mockStore = createMockStore([]);

const mockUseLocationValue = {
  pathname: '/taskDetail',
  search: '',
  hash: '',
  state: { cardTitle: 'UnAssigned', name: 'Mission Impossible' },
};
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('<AddTask />', () => {
  let setOpen, open, titleTextBox, task;

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
    jest.spyOn(redux, 'useSelector').mockReturnValue({
      tasks: tasks, // your mock here
    });
    render(<AddTask open={open} setOpen={setOpen} />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      ),
    });
    titleTextBox = screen.getByLabelText(/name/i);
  };

  beforeEach(() => {
    setOpen = jest.fn();
    open = true;
    task = {
      name: 'Mission Impossible',
      description: 'This is really difficult',
      deadline: '2023-10-22T08:16:50.855Z',
      imgData: '',
      isFavorite: false,
    };
  });
  test('should check for default form initial labels for task form', () => {
    setup();
    expect(
      screen.getByText('Fill out the details for adding a new task.')
    ).toBeInTheDocument();
  });
  test('should check for TaskDetails form to be loaded', () => {
    setup();
    fireEvent.change(titleTextBox, {
      target: { value: 'Mission Impossible' },
    });

    expect(screen.getByTestId('form')).toHaveFormValues({
      name: task.name,
    });
  });
});
