import { ADD_NEW_RESULT_COMMAND_SCOOTER, ADD_POSTS, CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN, DELETE_ALL_POSTS, DELETE_ALL_RESULT_COMMAND_SCOOTER, DELETE_ONE_POSTS, EDIT_POST, LOAD_POSTS } from "../types"

export const loadPosts = () => {
    return {
        type: LOAD_POSTS,
        // payload: 'payload'
        title: action.title
    }
}

export const addPosts = scooter => {
    scooter.id = Date.now().toString()
    scooter.online = "да"
    scooter.command = "Успешно"
    return {
        type: ADD_POSTS,
        payload: scooter
        // title: action.title
    }
}

export const deleteAllPosts = allPosts => {
    return {
        type: DELETE_ALL_POSTS,
        payload: allPosts
    }
}

export const deleteOnePosts = id => {
    return {
        type: DELETE_ONE_POSTS,
        payload: id
    }
}

export const editPost = scooternum => {
    return {
        type: EDIT_POST,
        payload: scooternum
    }
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// ДЛЯ РЕЗУЛЬТАТА

export const addNewResultCommandScooter = scooter => {
    scooter.id = Date.now().toString()
    // scooter.online = "да"
    // scooter.command = "Успешно"
    return {
        type: ADD_NEW_RESULT_COMMAND_SCOOTER,
        payload: scooter
        // title: action.title
    }
}

export const deleteAllResultCommandScooter = scooter => {
    return {
        type: DELETE_ALL_RESULT_COMMAND_SCOOTER,
        payload: scooter
    }
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// ДЛЯ ПЕРЕМЕННОЙ ОТКРЫТИЯ РУЧНОГО ВВОДА НОМЕРА

export const changeValueInputAddNumberOpen = scooter => {
    return {
        type: CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN,
    }
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// ДЕФОЛТ

