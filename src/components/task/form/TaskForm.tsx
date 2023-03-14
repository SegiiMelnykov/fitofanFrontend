import React, {  useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'components/task/form/index.css'
import { BsCalendarEvent } from 'react-icons/bs';

import { ITask } from 'models/models';
import { pathConst } from 'utils/pathConst';
import { format } from 'date-fns';
import { useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } from 'store/api/data.api';

type Props = {
    task: ITask
    edit?: boolean
}


const TaskForm = ({task, edit}: Props) => {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [formState, setFormState] = useState({ ...task, dueDate: new Date(task.dueDate) });  //fix date format from postgress
    const [addTask, { isSuccess: addSuccess, isError: addError, error: addErrorMsg }] = useAddTaskMutation()
    const [updateTask, { isSuccess: upSuccess, isError: upError, error: upErrorMsg }]= useUpdateTaskMutation()
    const [removeTask, { isSuccess: rmSuccess, isError: rmError, error: rmErrorMsg }] = useRemoveTaskMutation()


    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, title: e.target.value });
    }
    const handleDate = (date: Date) => {
        setFormState({ ...formState, dueDate: date });
        setShowCalendar(false);
    }
    const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, completed: e.target.checked });
    }
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState({ ...formState, description: e.target.value });
    }

    const handleRemove = () => {
        if(edit) {
            removeTask(task.id)
        } else {
            handleDischarge()
        }
    };

    const handleDischarge = () => {
        navigate(pathConst.TASKS)
    }

    const handleSubmit = () => {  
        if (edit) {
            updateTask(formState).then(() => handleDischarge())
        } else {
            addTask(formState).then(() => handleDischarge())
        }
    }

    console.log({addErrorMsg})
   
    return (
        <div>
            <Form>
                 
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder="Enter title" onChange={handleTitle} value={formState.title}  />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <InputGroup style={{ marginTop: '32px' }} >
                        <Form.Control
                        value={format(formState.dueDate,'yyyy MMMM dd')}
                        onChange={()=> null}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowCalendar(!showCalendar)}>
                        <BsCalendarEvent/>
                        </Button>
                        {showCalendar && <Calendar onChange={handleDate} value={formState.dueDate} />}
                    </InputGroup>
                    </Col>

                </Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="mark as done" onChange={handleCompleted} checked={formState.completed} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={handleDescription} value={formState.description} />
                </Form.Group>

                <div>
                <Button variant="outline-primary" type="button" onClick={handleDischarge}>
                    disharge
                </Button>
                <Button variant="outline-danger" type="button" onClick={handleRemove} className='float-end'>
                    remove
                </Button>
                <Button variant="primary" type="button" onClick={handleSubmit} className='float-end mx-3'>
                    save
                </Button>
                </div>
            </Form>

        </div>
    );
};

export default TaskForm;