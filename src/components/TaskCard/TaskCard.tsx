import React from 'react';
import './TaskCard.scss';

import UpdateIcon from '@material-ui/icons/RefreshRounded';
import FinishIcon from '@material-ui/icons/CheckCircleRounded';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { TaskType } from '../../types/task.type';

interface TaskCardProps {
  task: TaskType;
  action: (action: 'update' | 'finish', task: TaskType) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { task, action } = props;

  return (
    <Card className="TaskCard" elevation={2}>
      <CardContent style={{ borderBottom: `8px solid ${task.iscompleted ? 'rgb(96,206,118	)' : 'red'}` }}>
        <div className="TaskCard-content">
          <div>
            {!task.iscompleted &&
              <Checkbox />
            }
          </div>

          <div style={{ flexGrow: 1, marginLeft: 20 }}>
            <Typography align="left" variant="body1">{task.task}</Typography>
            <Typography align="left" variant="body2" color="textSecondary">{task.description}</Typography>
          </div>

          <div className="TaskCard-icons">
            {!task.iscompleted &&
              <Tooltip title="Update task" placement="bottom">
                <IconButton onClick={() => action('update', task)}>
                  <UpdateIcon />
                </IconButton>
              </Tooltip>
            }

            {!task.iscompleted &&
              <Tooltip title="Finish task" placement="bottom">
                <IconButton onClick={() => action('finish', task)}>
                  <FinishIcon />
                </IconButton>
              </Tooltip>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
