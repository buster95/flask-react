import React from 'react';
import './TaskDeleteDialog.scss';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface TaskDeleteDialogProps {
  open: boolean;
  onClose: (isConfirmed: boolean) => void;
}

const TaskDeleteDialog: React.FC<TaskDeleteDialogProps> = (props) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} className="TaskDeleteDialog">
      <DialogTitle>My Awesome App</DialogTitle>

      <DialogContent>
        Do you really like to delete this tasks?
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={() => onClose(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => onClose(true)}>Accept</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteDialog;
