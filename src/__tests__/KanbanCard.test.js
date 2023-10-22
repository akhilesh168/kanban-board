import { render, screen } from '@testing-library/react';

import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import KanbanCard from '../components/KanbanCard';

const mockStore = createMockStore([]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('@dnd-kit/utilities', () => {
  return {
    CSS: {
      Translate: {},
    },
  };
});

jest.mock('@dnd-kit/core', () => {
  const useDroppableMock = () => {
    return {
      setNodeRef: () => {},
    };
  };
  const useDraggableMock = () => {
    return {
      setNodeRef: () => {},
      attributes: [],
      transform: {},
      listeners: [],
    };
  };
  return {
    useDroppable: useDroppableMock,
    useDraggable: useDraggableMock,
  };
});
describe('<KanbanCard />', () => {
  let cardDetail, title, index, titleTextBox, task;
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
    jest.spyOn(redux, 'useSelector').mockReturnValue({
      tasks: tasks, // your mock here
    });
    render(
      <KanbanCard
        index={index}
        parent={title}
        cardDetail={cardDetail}
        title={title}
        key={index}
      />,
      {
        wrapper: ({ children }) => (
          <Provider store={store}>
            <MemoryRouter>{children}</MemoryRouter>
          </Provider>
        ),
      }
    );
    titleTextBox = screen.getByTestId(/Mission Impossible/i);
  };

  beforeEach(() => {
    cardDetail = {
      name: 'Mission Impossible',
      description: 'This is really difficult',
      deadline: '2023-10-22T08:16:50.855Z',
      imgData: '',
      isFavorite: false,
    };
    title = 'UnAssigned';
    index = 0;
  });
  test('should check for default values for Kanban Card form', () => {
    setup();
    expect(titleTextBox).toBeInTheDocument();
  });
});
