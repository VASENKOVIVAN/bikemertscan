import {
    LOAD_POSTS,
    ADD_POSTS,
    DELETE_ALL_POSTS,
    EDIT_POST,
    ADD_NEW_RESULT_COMMAND_SCOOTER,
    DELETE_ALL_RESULT_COMMAND_SCOOTER,
    CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN,
    DELETE_ONE_POSTS
} from "../types"

const initialState = {
    allAddedObjectsArray: [
        // { 'id': '1', 'title': '510063' },
        // { 'id': '2', 'title': '515047' },
        // { 'id': '3', 'title': '510063' },
        // { 'id': '4', 'title': '515047' },
        // { 'id': '5', 'title': '510063' },
        // { 'id': '6', 'title': '515047' },
        // { 'id': '7', 'title': '510063' },
        // { 'id': '8', 'title': '515047' },
        // { 'id': '9', 'title': '510063' },
        // { 'id': '10', 'title': '515047' },
        // { 'id': '11', 'title': '510063' },
        // { 'id': '12', 'title': '515047' },
        // { 'id': '13', 'title': '510063' },
        // { 'id': '14', 'title': '515047' },

        // { 'id': '3', 'title': '510212' },
        // { 'id': '4', 'title': '510121' },
        // { 'id': '5', 'title': '510077' },
        // { 'id': '6', 'title': '510155' },
        // { 'id': '7', 'title': '510078' },
        // { 'id': '8', 'title': '510108' },
        // { 'id': '9', 'title': '510158' },
        // { 'id': '10', 'title': '510184' },
        // { 'id': '11', 'title': '510095' },
        // { 'id': '12', 'title': '510231' },
        // { 'id': '13', 'title': '510171' },
        // { 'id': '14', 'title': '510126' },
        // { 'id': '15', 'title': '510195' },
        // { 'id': '16', 'title': '510142' },
    ],
    resultsCommandsScootersArray: [],
    inputAddNumberOpen: false
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {

        // case "increment":
        //     return {
        //         ...state,
        //         count: state.count + 1
        //     }

        // case "decrement":
        //     return {
        //         ...state,
        //         count: state.count - 1
        //     }
        case LOAD_POSTS:
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    title: action.title
                }
            ]

        case ADD_POSTS:
            return {
                ...state,
                allAddedObjectsArray: [...state.allAddedObjectsArray, { ...action.payload }]
            }

        case DELETE_ALL_POSTS:
            return {
                ...state,
                allAddedObjectsArray: []
            }

        case DELETE_ONE_POSTS:

            return {
                ...state,
                allAddedObjectsArray: state.allAddedObjectsArray.filter(post => post.id !== action.payload.id)
            }


        case EDIT_POST:
            const allAddedObjectsArray = state.allAddedObjectsArray.map(post => {
                if (post.title === action.payload.title) {
                    post.online = action.payload.online
                }
                return {
                    ...state, allAddedObjectsArray
                }
            })

        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
        // ДЛЯ РЕЗУЛЬТАТА

        case ADD_NEW_RESULT_COMMAND_SCOOTER:
            return {
                ...state,
                resultsCommandsScootersArray: [...state.resultsCommandsScootersArray, { ...action.payload }]
            }
        case DELETE_ALL_RESULT_COMMAND_SCOOTER:
            return {
                ...state,
                resultsCommandsScootersArray: []
            }

        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
        // ДЛЯ ПЕРЕМЕННОЙ ОТКРЫТИЯ РУЧНОГО ВВОДА НОМЕРА
        case CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN:
            return {
                ...state,
                inputAddNumberOpen: !state.inputAddNumberOpen
            }


        // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
        // ДЕФОЛТ
        default:
            // throw new Error()
            return state
    }
}