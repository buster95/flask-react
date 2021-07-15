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

interface TaskCardProps {
  task: string;
  description: string;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { task, description } = props;

  return (
    <Card className="TaskCard" elevation={2}>
      <CardContent>
        <div className="TaskCard-content">
          <div>
            <Checkbox></Checkbox>
          </div>

          <div style={{ flexGrow: 1, marginLeft: 20 }}>
            <Typography align="left" variant="body1">{task}</Typography>
            <Typography align="left" variant="body2" color="textSecondary">{description}</Typography>
          </div>

          <div className="TaskCard-icons">
            <Tooltip title="Update task" placement="bottom">
              <IconButton>
                <UpdateIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Finish task" placement="bottom">
              <IconButton>
                <FinishIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
