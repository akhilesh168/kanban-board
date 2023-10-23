import { waitFor } from '@testing-library/react';
import { DefaultCards } from '../utils/constants';
import { createKeysObject, getBase64 } from '../utils/helperMethods';

describe('Test helper methods', () => {
  test('should getBase64 method be called', async () => {
    const file = new File(['test file content'], 'test.txt', {
      type: 'text/plain',
    });
    const base64Output = await waitFor(() => getBase64(file));
    expect(base64Output).toBeTruthy();
  });
  test('should createKeysObject method be called', async () => {
    const newObject = createKeysObject(DefaultCards);
    expect(newObject).toEqual({
      ToDo: [],
      'In Progress': [],
      Done: [],
      UnAssigned: [],
    });
  });
});
