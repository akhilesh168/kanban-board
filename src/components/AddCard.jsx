import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCard } from '../redux/TaskSlice';

const AddCard = ({ cardModalOpen, setCardModalOpen }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (title) dispatch(addNewCard(title));
    setTitle('');
    setCardModalOpen(!cardModalOpen);
  };

  return (
    <Dialog
      open={cardModalOpen}
      onClose={() => setCardModalOpen(!cardModalOpen)}
    >
      <DialogTitle>Card</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out the details for adding a new card.
        </DialogContentText>
        <TextField
          variant="standard"
          type="text"
          flex={4}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          label="Add Title"
          data-testid="Add Title"
        />
      </DialogContent>
      <DialogActions>
        <Button
          flex={1}
          sx={{ mx: 3, backgroundColor: 'primary.dark', color: 'white' }}
          onClick={handleSubmit}
        >
          Add Card
        </Button>
        <Button
          variant="contained"
          onClick={() => setCardModalOpen(!cardModalOpen)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCard.propTypes = {
  setCardModalOpen: PropTypes.func,
  cardModalOpen: PropTypes.bool,
};

export default memo(AddCard);
