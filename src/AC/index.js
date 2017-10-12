import {
    SET_LOCATION,
    NEW_TASK,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    EDIT_TASK_ITEM,
    SET_TASKS,
    SET_SERVICES
} from '../constants'

export function setLocation(location) {
    return {
        type: SET_LOCATION,
        payload: {location}
    }
}

export function newTask() {
    return {
        type: NEW_TASK
    }
}

export function createTask() {
    return {
        type: CREATE_TASK
    }
}

export function editTask() {
    return {
        type: EDIT_TASK
    }
}

export function deleteTask() {
    return {
        type: DELETE_TASK
    }
}

export function editTaskItem(id) {
    return {
        type: EDIT_TASK_ITEM,
        payload: {id}
    }
}

export function setTasks(tasks) {
    return {
        type: SET_TASKS,
        payload: {tasks}
    }
}

export function setServices(services) {
    return {
        type: SET_SERVICES,
        payload: {services}
    }
}



