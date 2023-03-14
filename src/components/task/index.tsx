import React from 'react';
import { useLocation } from 'react-router-dom';
import { ITask } from 'models/models';
import { pathConst } from 'utils/pathConst';
import TaskForm from './form/TaskForm';
import { useLazyGetTaskQuery } from 'store/api/data.api';

const initialState:ITask = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    dueDate: new Date(), 
}

const Task = () => {
    const location = useLocation();
    const [getTask, {data, isSuccess, isError}] = useLazyGetTaskQuery();
    const isNewTask = location.pathname === pathConst.TASK_CREATE;

    React.useEffect(() => {
        if (!isNewTask) {
            const taskId = location.pathname.split('/').pop();
            if (taskId) getTask(taskId as string);
        }
    }, []);
   
    if (isNewTask) {
        return (
            <div>
                <h2>New Task</h2>
                <TaskForm task={initialState} edit={false} />
            </div>
        );
    } else if(isSuccess && !isError) {
        return (
            <div>
                <h2>Edit Task</h2>
                <TaskForm task={data!} edit={true} />
            </div>
        );
    } else {
        return <p>somthing went wrong... try again later...</p>
    }

};

export default Task;