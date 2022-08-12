import {
    LOAD_POSTS,
    ADD_POSTS,
    DELETE_ALL_POSTS,
    EDIT_POST,
    ADD_NEW_RESULT_COMMAND_SCOOTER,
    DELETE_ALL_RESULT_COMMAND_SCOOTER,
    CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN
} from "../types"

const initialState = {
    allAddedObjectsArray: [
        // {
        //     "id": "1",
        //     "title": "510001"
        // },
        // {
        //     "id": "2",
        //     "title": "510002"
        // },
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