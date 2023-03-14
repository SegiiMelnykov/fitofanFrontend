import React from 'react';
import Taskslist from 'components/taskList';
import AddTask from 'components/taskList/addTask/AddTask';
import 'assets/css/tasksPage.css';



const TasksPage = () => {
    return (
        <div>
            <h1>Tasks list</h1>
            <Taskslist />
        </div>  
    );
};

export default TasksPage;