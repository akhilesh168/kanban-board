import { useDroppable } from '@dnd-kit/core';
import SortIcon from '@mui/icons-material/Sort';
import { Box, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { sortTaskAlphabeticalWithFavorite } from '../redux/TaskSlice';
import KanbanCard from './KanbanCard';

const KanbanLane = ({ title, items }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const dispatch = useDispatch();
  return (
    <Box
      flex={3}
      padding={3}
      display={'flex'}
      flexDirection={'column'}
      minHeight="50rem"
      minWidth={'20vw'}
    >
      <Typography
        variant="subtitle1"
        sx={{
          p: 1,
          bgcolor: 'grey.300',
        }}
      >
        {title} {items.length ? `(${items.length})` : ''}
        <IconButton
          onClick={() =>
            dispatch(sortTaskAlphabeticalWithFavorite({ container: title }))
          }
        >
          <SortIcon />
        </IconButton>
      </Typography>
      <Box
        ref={setNodeRef}
        sx={{
          display: 'flex',
          bgcolor: 'grey.200',
          borderRadius: '8',
          flex: 1,
          padding: 2,
          flexDirection: 'column',
        }}
      >
        {items &&
          items?.map((item, index) => (
            <KanbanCard
              title={item?.name}
              cardDetail={item}
              key={index}
              index={index}
              parent={title}
            />
          ))}
      </Box>
    </Box>
  );
};

KanbanLane.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};
export default memo(KanbanLane);
