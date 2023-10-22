import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../redux/TaskSlice';
import TaskDetailsForm from './TaskDetailsForm';

const AddTask = ({ setOpen, open }) => {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (task) => {
      if (task) dispatch(addNewTask(task));
      setOpen(false);
    },
    [setOpen, dispatch]
  );

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the details for adding a new task.
          </DialogContentText>
          <TaskDetailsForm
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

AddTask.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};
export default memo(AddTask);
