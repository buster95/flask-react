import React, { useEffect, useState } from 'react';
import './Task.scss';
import TaskCard from '../TaskCard/TaskCard';
import TaskDialog from '../TaskDialog/TaskDialog';
import TaskCompletedDialog from '../TaskCompletedDialog/TaskCompletedDialog';
import { TaskType } from '../../types/task.type';
import { TaskService } from '../../services/task.service';

import Typography from '@material-ui/core/Typography';

interface TaskProps {
  lastTask?: TaskType;
}

const Task: React.FC<TaskProps> = (props) => {
  const { lastTask } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    TaskService.getAll().then(tasks => {
      setTasks(tasks);
    }).catch(error => {
      console.error(error)
    });
  }, []);

  useEffect(() => {
    if (lastTask) setTasks([...tasks, lastTask]);
  }, [lastTask]);

  function handleOnCloseUpdateDialog(task?: TaskType) {
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

  function handleOnCloseCompletedDialog(isCompleted: boolean) {
    setOpenCompletedDialog(false);
    if (task !== null && isCompleted) {
      TaskService.complete(task, isCompleted).then(() => {
        setTasks(tasks.map(item => {
          if (item.id === task.id) {
            item.iscompleted = isCompleted;
            return item;
          }
          return item;
        }));
      }).catch(error => {
        console.error(error);
      });
    }
  }

  function handleCardAction(action: 'update' | 'finish', returnedTask: TaskType) {
    switch (action) {
      case 'update':
        setTask(returnedTask);
        setOpenDialog(true)
        break;

      case 'finish':
        setTask(returnedTask);
        setOpenCompletedDialog(true);
        break;

      default:
        break;
    }
  }

  return (
    <div className="Task">
      <Typography variant="h5" style={{ marginBottom: 20 }}>Task List</Typography>
      <TaskDialog open={openDialog} task={task} onClose={handleOnCloseUpdateDialog} />
      <TaskCompletedDialog open={openCompletedDialog} task={task || { id: 0, task: '', description: '', iscompleted: false }} onClose={handleOnCloseCompletedDialog} />

      {tasks.map((task: TaskType, index: number) => (
        <TaskCard key={index} task={task} action={handleCardAction} />
      ))}
    </div>
  );
}

export default Task;
