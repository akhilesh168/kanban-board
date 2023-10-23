import { render, screen } from '@testing-library/react';

import { DndContext } from '@dnd-kit/core';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from 'redux-mock-store';
import KanbanBoard from '../components/KanbanBoard';

const mockStore = createMockStore([]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
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
    DndContext: () => (
      <div data-testid="Mission Impossible">This is empty text</div>
    ),
  };
});
describe('<KanbanBoard />', () => {
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
    jest.spyOn(redux, 'useSelector').mockReturnValue({
      tasks: tasks,
    });

    render(
      <DndContext>
        <KanbanBoard />
      </DndContext>,
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
  test('should check for default values for KanbanBoard DndContext', () => {
    setup();
    expect(titleTextBox).toBeInTheDocument();
  });
});
