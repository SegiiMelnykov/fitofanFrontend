import React from 'react';
import TaskItem from './taskItem/TaskItem';
import { ITask } from '../../models/models';
import { useGetTasksQuery } from 'store/api/data.api';
import AddTask from './addTask/AddTask';


const Taskslist = () => {

    const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        if ('status' in error) {
          // you can access all properties of `FetchBaseQueryError` here
          const errMsg = 'status' in error ? error.data.message : error
          
          return (
            <div>
              <div>An error has occurred:</div>
              <div>{errMsg}</div>
            </div>
          )
        }
        else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }
      }

    if (tasks && tasks.length === 0) {
        return (
            <>
                <p>Create your first task!</p>
                <AddTask />
            </>)
    }
    
    return (
        <>
            {tasks?.map((task: ITask) => {
                    return (
                        <TaskItem task={task} key={task.id} />
                    )
                })
            }
            <AddTask />
        </>
    );
};

export default Taskslist;