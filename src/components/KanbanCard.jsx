import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTask, markTaskAsFavorite } from '../redux/TaskSlice';

const KanbanCard = ({ cardDetail, title, index, parent }) => {
  const { id, name, description, deadline, imgData, isFavorite } = cardDetail;
  const dispatch = useDispatch();
  const { attributes, setNodeRef, transform, listeners } = useDraggable({
    id: title,
    data: {
      id,
      name,
      index,
      parent,
      description,
      deadline,
      imgData,
      isFavorite,
    },
  });
  const navigate = useNavigate();
  const onDelete = () => {
    dispatch(deleteTask({ name, container: parent }));
  };
  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Card
        sx={{ transform: style?.transform }}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        <CardMedia>
          <IconButton
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={() =>
              dispatch(markTaskAsFavorite({ container: parent, index }))
            }
          >
            <FavoriteIcon />
          </IconButton>
        </CardMedia>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              data-testid={name}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-testid={description}
            >
              {description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-testid={deadline}
            >
              {deadline}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() =>
                navigate(`taskDetail`, { state: { name, cardTitle: parent } })
              }
            >
              See Details
            </Button>
            <Button
              onClick={onDelete}
              variant="contained"
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};

KanbanCard.propTypes = {
  cardDetail: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    imgData: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
  title: PropTypes.string,
  index: PropTypes.number,
  parent: PropTypes.string,
};

export default memo(KanbanCard);
