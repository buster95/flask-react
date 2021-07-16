import React, { useEffect, useState } from 'react';
import './TaskDialog.scss';
import { TaskType } from '../../types/task.type';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

interface TaskDialogProps {
  open: boolean;
  onClose: (task?: TaskType) => void;
  task: TaskType | null;
}

const TaskDialog: React.FC<TaskDialogProps> = (props) => {
  const { open, onClose, task } = props;
  const title = task === null ? 'New Task' : 'Update Task';
  const buttonLabel = task === null ? 'Create' : 'Update';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(task?.task || '');
    setDescription(task?.description || '');
  }, [task, open]);

  function handleOnClose(willSend: boolean) {
    if (willSend) {
      if (task === null) {
        onClose({
          id: -1,
          task: name,
          description: description,
          iscompleted: false,
        });
      } else {
        onClose({ ...task, task: name, description: description });
      }
    } else {
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={() => handleOnClose(false)} className="TaskDialog">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <TextField label="Task name" value={name} onChange={(evt) => setName(evt.target.value)} variant="outlined" margin="normal" fullWidth />
        <TextField label="Task description" value={description} onChange={(evt) => setDescription(evt.target.value)} variant="outlined" margin="normal" fullWidth />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={() => handleOnClose(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => handleOnClose(true)}>{buttonLabel}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDialog;
