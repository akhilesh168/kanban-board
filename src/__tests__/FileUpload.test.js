import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FileUpload from '../components/FileUpload';
const helperMethods = require('../utils/helperMethods.js');

describe('<FileUpload> component testing', () => {
  test('should upload the file', async () => {
    let onChangeHandler = jest.fn;
    render(<FileUpload onChangeHandler={onChangeHandler} />);

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test file content'], 'test.txt', {
      type: 'text/plain',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });
    jest
      .spyOn(helperMethods, 'getBase64')
      .mockImplementation(() => Promise.resolve());
    const fileName = screen.getByTestId('file-name');
    expect(fileName.textContent).toBe('test.txt');
  });
});
