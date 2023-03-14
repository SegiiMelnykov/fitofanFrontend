import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ITask } from '../../../models/models';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { pathConst } from 'utils/pathConst';

type TaskItemProps = {
    task: ITask
}

const TaskItem = ({task}: TaskItemProps) => {
    const navigate = useNavigate()
    task = { ...task, dueDate: new Date(task.dueDate) } //fix date format from postgress

    const count = 50;
    const shortDescription = task.description.slice(0, count) + (task.description.length > count ? "..." : "");


    const handle = () => {
        navigate(pathConst.TASK_EDIT + task.id)
    }

    return (
        <Card className='mb-3'>
            <Card.Header className={task.completed ? 'text-decoration-line-through' : ''}>{task.title}</Card.Header>
            <Card.Body>
                <Card.Title>Due date: {format(task.dueDate,'yyyy MMMM dd')}</Card.Title>
                <Card.Text>
                {shortDescription}
                </Card.Text>
                <Button variant="primary" className='float-end' onClick={handle}>edit</Button>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;