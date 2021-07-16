import React from 'react';
import './TaskCompletedDialog.scss';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TaskType } from '../../types/task.type';

interface TaskCompletedDialogProps {
  open: boolean;
  onClose: (iscompleted: boolean) => void;
  task: TaskType;
}

const TaskCompletedDialog: React.FC<TaskCompletedDialogProps> = (props) => {
  const { open, onClose, task } = props;

  return (
    <Dialog open={open} onClose={onClose} className="TaskCompletedDialog">
      <DialogTitle>My Awesome App</DialogTitle>

      <DialogContent>
        Do you really like to finish this task?
        <br />
        {task.task} {task.description}
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={() => onClose(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => onClose(true)}>Accept</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskCompletedDialog;
