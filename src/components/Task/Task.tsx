import React, { useEffect, useState } from 'react';
import './Task.scss';
import TaskCard from '../TaskCard/TaskCard';
import TaskDialog from '../TaskDialog/TaskDialog';
import TaskCompletedDialog from '../../helpers/TaskCompletedDialog/TaskCompletedDialog';
import { TaskType } from '../../types/task.type';
import { TaskService } from '../../services/task.service';

import Typography from '@material-ui/core/Typography';

interface TaskProps {
  lastTask?: TaskType;
  onSelectionChange: (tasks: TaskType[]) => void;
}

const Task: React.FC<TaskProps> = (props) => {
  const { lastTask, onSelectionChange } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    TaskService.getAll().then(tasks => {
      setTasks(tasks);
    }).catch(error => {
      console.error(error)
    });
  }, []);

  useEffect(() => {
    console.log(lastTask);
    if (lastTask !== undefined) {
      setTasks(tasks => {
        tasks.push(lastTask);
        return tasks;
      });
    } else {
      TaskService.getAll().then(tasks => {
        setTasks(tasks);
      }).catch(error => {
        console.error(error)
      });
    }
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

  function handleOnSelected(task: TaskType, selected: boolean) {
    if (selected) {
      setSelectedTasks(tasks => {
        tasks.push(task);
        return tasks;
      });
    } else {
      setSelectedTasks(tasks => {
        tasks.splice(tasks.indexOf(task), 1);
        return tasks;
      });
    }
    // onSelectionChange(tasks);
    onSelectionChange(selectedTasks);
  }

  return (
    <div className="Task">
      <Typography variant="h5" style={{ marginBottom: 20 }}>Task List</Typography>
      <TaskDialog open={openDialog} task={task} onClose={handleOnCloseUpdateDialog} />
      <TaskCompletedDialog open={openCompletedDialog} task={task || { id: 0, task: '', description: '', iscompleted: false }} onClose={handleOnCloseCompletedDialog} />

      {tasks.map((task: TaskType, index: number) => (
        <TaskCard key={index} task={task} action={handleCardAction} onSelected={handleOnSelected} />
      ))}
    </div>
  );
}

export default Task;
