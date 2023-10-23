import reducer from '../redux/TaskSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    tasks: {
      Done: [],
      'In Progress': [],
      ToDo: [],
      UnAssigned: [],
    },
  });
});
