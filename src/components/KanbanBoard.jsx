import { DndContext, rectIntersection } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Grid, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../redux/TaskSlice';
import AddCard from './AddCard';
import AddTask from './AddTask';
import KanbanLane from './KanbanLane';

const KanbanBoard = () => {
  const [open, setOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const { tasks } = useSelector((state) => state?.tasks);
  const dispatch = useDispatch();
  const cards = Object.keys(tasks);

  const handleCardModalCallback = useCallback(
    () => setCardModalOpen(!cardModalOpen),
    [cardModalOpen]
  );

  const handleTaskModalCallback = useCallback(() => setOpen(!open), [open]);
  const onDragEnd = (e) => {
    const container = e.over?.id;
    const title = e.active.data.current?.name ?? '';
    const deadline = e.active.data.current?.deadline ?? new Date();
    const description = e.active.data?.current?.description ?? '';
    const parent = e.active.data.current?.parent ?? 'ToDo';
    const imgData = e.active.data.current.imgData ?? '';
    const isFavorite = e.active.data.current.isFavorite ?? false;
    if (parent === container) {
      return;
    } else {
      const unAssignedItem = {
        name: title,
        deadline,
        description,
        imgData,
        isFavorite,
      };
      dispatch(moveTask({ container, unAssignedItem, parent }));
    }
  };

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
      <Box flexDirection={'column'}>
        <AddCard
          cardModalOpen={cardModalOpen}
          setCardModalOpen={setCardModalOpen}
        />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {cards &&
            cards?.map((item) => (
              <Grid item xs={3} key={item}>
                <KanbanLane title={item} items={tasks[item]} />
              </Grid>
            ))}
          <Grid item xs>
            <Stack sx={{ m: 2, p: 2, width: 200 }} spacing={2}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleCardModalCallback}
              >
                <AddIcon />
                Add Card
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleTaskModalCallback}
              >
                <AddIcon />
                Add Task
              </Fab>
            </Stack>
          </Grid>
        </Grid>

        <AddTask open={open} setOpen={setOpen} />
      </Box>
    </DndContext>
  );
};

export default KanbanBoard;
