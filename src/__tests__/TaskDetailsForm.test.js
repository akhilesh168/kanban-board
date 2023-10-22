import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import TaskDetailsForm from '../components/TaskDetailsForm';

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

describe('<TaskDetailsForm />', () => {
  let handleSubmit;
  let onCancel;
  let nameTextBox;
  let descriptionTextBox;
  let task;
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
    render(
      <TaskDetailsForm onCancel={onCancel} handleSubmit={handleSubmit} />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>
            <MemoryRouter>{children}</MemoryRouter>
          </Provider>
        ),
      }
    );

    nameTextBox = screen.getByLabelText(/name/i);
    descriptionTextBox = screen.getByLabelText(/description/i);
  };

  beforeEach(() => {
    onCancel = jest.fn();
    handleSubmit = jest.fn();
    task = {
      name: 'Mission Impossible',
      description: 'This is really difficult',
      deadline: '2023-10-22T08:16:50.855Z',
      imgData: '',
      isFavorite: false,
    };
  });
  test('should load task into form', () => {
    setup();
    fireEvent.change(nameTextBox, { target: { value: 'Mission Impossible' } });
    fireEvent.change(descriptionTextBox, {
      target: { value: 'This is really difficult' },
    });

    expect(screen.getByTestId('form')).toHaveFormValues({
      name: task.name,
      description: task.description,
    });
  });
  test('should click handleSubmit', () => {
    setup();
    userEvent.click(screen.getByTestId('createTaskButton'));
    expect(nameTextBox).toBeInTheDocument();
  });
});
