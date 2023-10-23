import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, CssBaseline, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FallBack from './components/FallBack';
import KanbanBoard from './components/KanbanBoard';
import PageNotFound from './components/PageNotFound';
import TaskDetailsForm from './components/TaskDetailsForm';
import { onResetState } from './redux/TaskSlice';

function App() {
  const dispatch = useDispatch();
  const logErrorToService = (error, info) => {
    console.error('Caught an error:', error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={FallBack}
      onReset={() => dispatch(onResetState)}
      onError={logErrorToService}
    >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            data-testid="mainTitleJiraBoard"
            variant="h6"
            color="inherit"
            component="div"
          >
            Jira Board
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route element={<KanbanBoard />} path="/" />
          <Route element={<TaskDetailsForm />} path="/taskDetail" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
