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
import TaskDeleteDialog from '../helpers/TaskDeleteDialog/TaskDeleteDialog';

const App: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);
  const [lastTask, setLastTask] = useState<TaskType>();

  async function handleOnAdd(task?: TaskType) {
    if (task !== undefined) {
      if (task.id < 0) {
        const newTask = (await TaskService.save(task)).data;
        setLastTask(newTask);
      }
    }
    setOpenAdd(false);
  };

  function onSelectionChange(tasks: TaskType[]) {
    setShowDelete(tasks.length > 0);
    setSelectedTasks(tasks);
  }

  async function handleOnDeleteClose(isConfirmed: boolean) {
    if (isConfirmed) {
      for (const task of selectedTasks) {
        await TaskService.delete(task.id);
      }
      setLastTask(undefined);
    }
    setOpenDelete(false);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ textAlign: 'left', flexGrow: 1 }}>
            My Awesome App
          </Typography>

          {showDelete &&
            <IconButton edge="end" color="inherit" style={{ marginLeft: 15 }} onClick={() => setOpenDelete(true)}>
              <DeleteIcon />
            </IconButton>
          }

          <IconButton edge="end" color="inherit" style={{ marginLeft: 15 }} onClick={() => setOpenAdd(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="container">
        <Task lastTask={lastTask} onSelectionChange={onSelectionChange} />

        <TaskDialog open={openAdd} onClose={handleOnAdd} task={null} />
        <TaskDeleteDialog open={openDelete} onClose={handleOnDeleteClose} />
      </div>
    </div>
  );
}

export default App;
