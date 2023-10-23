import { render, screen } from '@testing-library/react';

import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import App from '../App';

const mockStore = createMockStore([]);
const mockUseLocationValue = {
  pathname: '',
  search: '',
  hash: '',
  state: { cardTitle: 'UnAssigned', name: 'Mission Impossible' },
};
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('<App />', () => {
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
      tasks: tasks,
    });
    render(<App />, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
  };
  test('should check for default form initial labels for App form', () => {
    setup();
    expect(screen.getByTestId(/mainTitleJiraBoard/i)).toBeInTheDocument();
  });
});
