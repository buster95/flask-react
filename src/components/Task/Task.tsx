import React, { useEffect, useState } from 'react';
import './Task.scss';

import Typography from '@material-ui/core/Typography';
import TaskCard from '../TaskCard/TaskCard';
import { TaskType } from '../../types/task.type';
import TaskDialog from '../TaskDialog/TaskDialog';
import { TaskService } from '../../services/task.service';

const Task: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    TaskService.getAll().then(tasks => {
      setTasks(tasks);
    }).catch(error => {
      console.error(error)
    });
  }, []);

  const handleOnClose = (task?: TaskType) => {
    if (task === undefined) {
      setOpenDialog(false);
      return;
    }
    TaskService.update(task.id, task).then(() => {
      setTasks(tasks.map(item => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      }));
      setOpenDialog(false);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleCardAction = (action: 'update' | 'finish', returnedTask: TaskType) => {
    switch (action) {
      case 'update':
        setTask(returnedTask);
        setOpenDialog(true)
        break;

      case 'finish':
        setTask(returnedTask);
        break;

      default:
        break;
    }
  }

  return (
    <div className="Task">
      <Typography variant="h5" style={{ marginBottom: 20 }}>Task List</Typography>
      <TaskDialog open={openDialog} task={task} onClose={handleOnClose} />

      {tasks.map((task: TaskType, index: number) => (
        <TaskCard key={index} task={task} action={handleCardAction} />
      ))}
    </div>
  );
}

export default Task;
