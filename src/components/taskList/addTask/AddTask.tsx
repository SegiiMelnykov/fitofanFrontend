import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { pathConst } from 'utils/pathConst';

const AddTask = () => {
    const navigate = useNavigate();

    const handleAddTask = () => {
        navigate(pathConst.TASK_CREATE)
    }

    return (
        <div className='float-end'>
            <Button onClick={handleAddTask}>Add Task</Button>
        </div>
    );
};

export default AddTask;