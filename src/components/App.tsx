import React, { useState } from 'react';
import './App.scss';
import Task from './Task/Task';
import TaskDialog from './TaskDialog/TaskDialog';
import { TaskType } from '../types/task.type';

import AddIcon from '@material-ui/icons/AddRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { TaskService } from '../services/task.service';

const App: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [lastTask, setLastTask] = useState<TaskType>();

  const handleOnAdd = async (task?: TaskType) => {
    if (task !== undefined) {
      if (task.id < 0) {
        const newTask = (await TaskService.save(task)).data;
        setLastTask(newTask);
      }
    }
    setOpenAdd(false);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ textAlign: 'left', flexGrow: 1 }}>
            My Awesome App
          </Typography>

          <IconButton edge="end" color="inherit" style={{ marginLeft: 15 }} aria-label="menu">
            <DeleteIcon />
          </IconButton>

          <IconButton edge="end" color="inherit" style={{ marginLeft: 15 }} onClick={() => setOpenAdd(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="container">
        <Task lastTask={lastTask} />

        <TaskDialog open={openAdd} onClose={handleOnAdd} task={null} />
      </div>
    </div>
  );
}

export default App;
