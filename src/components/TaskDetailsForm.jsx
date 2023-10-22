import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNewTask, updateTask } from '../redux/TaskSlice';
import FileUpload from './FileUpload';

const TaskDetailsForm = ({ handleSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { state } = useLocation();
  const navigate = useNavigate();

  const existingTask = tasks[state?.cardTitle]?.find(
    (item) => item?.name === state?.name
  ) || {
    name: '',
    deadline: '',
    description: '',
    imgData: '',
    isFavorite: false,
  };
  const [task, setTask] = useState(existingTask);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTask(() => ({ ...task, [name]: value }));
  };

  const onSubmit = () => {
    if (task) {
      if (handleSubmit) {
        return handleSubmit(task);
      }
      if (state) {
        dispatch(updateTask({ task, state }));
        navigate(-1);
      } else {
        dispatch(addNewTask(task, state));
      }
    }
  };

  const imageUploder = (e) => {
    setTask(() => ({ ...task, imgData: e }));
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      sx={{
        bgcolor: (theme) => 'grey.200',
        m: 5,
        p: 10,
        maxWidth: '1000px',
      }}
    >
      <form data-testid="form" name="taskForm">
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
          value={task.name}
        />
        <TextField
          autoFocus
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
          value={task.description}
        />
        <TextField
          autoFocus
          margin="dense"
          name="deadline"
          label=""
          type="date"
          fullWidth
          variant="outlined"
          onChange={handleOnChange}
          value={task.deadline}
        />

        <Box sx={{ m: 4 }}>
          {task.imgData ? (
            <img
              alt={task?.name}
              width={50}
              height={50}
              src={`${task.imgData}`}
            />
          ) : (
            ''
          )}
        </Box>
        <ButtonGroup
          size="small"
          variant="outlined"
          aria-label="outlined button group"
        >
          <FileUpload onChangeHandler={imageUploder} />

          <Button
            variant="contained"
            onClick={onSubmit}
            startIcon={<AddTaskIcon />}
            data-testid="createTaskButton"
          >
            {state?.name ? 'Update Task' : 'Create Task'}
          </Button>
          <Button
            variant="contained"
            onClick={() => (onCancel ? onCancel() : navigate(-1))}
            startIcon={<CancelIcon />}
            data-testid="cancelTaskButton"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

TaskDetailsForm.propTypes = {
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default TaskDetailsForm;
