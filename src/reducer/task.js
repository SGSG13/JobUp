import {
    SET_LOCATION,
    NEW_TASK,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    EDIT_TASK_ITEM,
    SET_TASKS,
    SET_SERVICES,
    SET_HEIGHT,
    SET_HISTORY
} from '../constants'
import {Record} from 'immutable'
import randomId from '../utils/randomId'

const TaskRecord = Record({
    newTask: {
        id: randomId(),
        date: '',
        address: '',
        serviceType: '',
        taskType: '',
        description: ''
    },
    tasks: [],
    services: [],
    history: [],
    showCard: false,
    showMarker: 0,
    action: 'Create',
    height: 800
});

const defaultState = new TaskRecord();

export default (state = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_LOCATION:
            const {address} = payload.location;
            return state
                .set('newTask', {...state.newTask, address})
                .set('showMarker', 1);

        case NEW_TASK:
            return state
                .set('showCard', true)
                .set('action', 'Create');

        case CREATE_TASK:
            return state
                .set('newTask', {id: randomId()})
                .set('showCard', false)
                .set('showMarker', 0);

        case DELETE_TASK:
            return state
                .set('showCard', false);

        case EDIT_TASK:
            return state
                .set('newTask', {id: randomId()})
                .set('showCard', false)
                .set('showMarker', 0);

        case EDIT_TASK_ITEM:
            const editTaskItem = state.tasks.filter(task => task.id === payload.id)[0];
            return state
                .set('newTask', editTaskItem)
                .set('showCard', true)
                .set('action', 'Edit');

        case SET_TASKS:
            return state
                .set('tasks', payload.tasks);

        case SET_SERVICES:
            return state
                .set('services', payload.services);

        case SET_HEIGHT:
            return state
                .set('height', payload.height);
        
        case SET_HISTORY:
            return state
                .set('history', payload.history);
        
        default:
            return state;
    }
}
