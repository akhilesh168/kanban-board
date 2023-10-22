import { waitFor } from '@testing-library/react';
import { DefaultCards } from '../utils/constants';
import { createKeysObject, getBase64 } from '../utils/helperMethods';

describe('Test helper methods', () => {
  test('should getBase64 method be called', async () => {
    const file = new File(['test file content'], 'test.txt', {
      type: 'text/plain',
    });
    const x = await waitFor(() => getBase64(file));
    expect(x).toBeTruthy();
  });
  test('should createKeysObject method be called', async () => {
    const x = createKeysObject(DefaultCards);
    expect(x).toEqual({
      ToDo: [],
      'In Progress': [],
      Done: [],
      UnAssigned: [],
    });
  });
});
