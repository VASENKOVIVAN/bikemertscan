import {
  LOAD_POSTS,
  ADD_POSTS,
  DELETE_ALL_POSTS,
  EDIT_POST,
  ADD_NEW_RESULT_COMMAND_SCOOTER,
  DELETE_ALL_RESULT_COMMAND_SCOOTER,
  CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN,
  CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN_REMONT,
  DELETE_ONE_POSTS,
  CHANGE_VALUE_IS_ERROR_EXIST_REDUSER,
  CHANGE_VALUE_IS_ERROR_EXIST_REDUSER_ZERO,
} from "../types";

const initialState = {
  allAddedObjectsArray: [
    // { 'id': '1', 'title': '290064' },
    // { 'id': '2', 'title': '290046' },
    // { 'id': '3', 'title': '290602' },
    // { 'id': '4', 'title': '290700' },
    // { 'id': '5', 'title': '290031' },
    // { 'id': '6', 'title': '290500' },
    // { 'id': '7', 'title': '290042' },
    // { 'id': '8', 'title': '290023' },
    // { 'id': '9', 'title': '290062' },
    // { 'id': '10', 'title': '290054' },
    // { 'id': '11', 'title': '290026' },
    // { 'id': '12', 'title': '290704' },
    // { 'id': '13', 'title': '290008' },
    // { 'id': '14', 'title': '290048' },
  ],
  resultsCommandsScootersArray: [],
  inputAddNumberOpen: false,
  inputAddNumberOpenRemont: false,

  isEroorExistsReduser: 0,
};

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
          title: action.title,
        },
      ];

    case ADD_POSTS:
      return {
        ...state,
        allAddedObjectsArray: [
          ...state.allAddedObjectsArray,
          { ...action.payload },
        ],
      };

    case DELETE_ALL_POSTS:
      return {
        ...state,
        allAddedObjectsArray: [],
      };

    case DELETE_ONE_POSTS:
      return {
        ...state,
        allAddedObjectsArray: state.allAddedObjectsArray.filter(
          (post) => post.id !== action.payload.id
        ),
      };

    case EDIT_POST:
      const allAddedObjectsArray = state.allAddedObjectsArray.map((post) => {
        if (post.title === action.payload.title) {
          post.online = action.payload.online;
        }
        return {
          ...state,
          allAddedObjectsArray,
        };
      });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // ДЛЯ РЕЗУЛЬТАТА

    case ADD_NEW_RESULT_COMMAND_SCOOTER:
      return {
        ...state,
        resultsCommandsScootersArray: [
          ...state.resultsCommandsScootersArray,
          { ...action.payload },
        ],
      };
    case DELETE_ALL_RESULT_COMMAND_SCOOTER:
      return {
        ...state,
        resultsCommandsScootersArray: [],
      };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // ДЛЯ ПЕРЕМЕННОЙ ОТКРЫТИЯ РУЧНОГО ВВОДА НОМЕРА
    case CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN:
      return {
        ...state,
        inputAddNumberOpen: !state.inputAddNumberOpen,
      };
    case CHANGE_VALUE_INPUT_ADD_NUMBER_OPEN_REMONT:
      return {
        ...state,
        inputAddNumberOpenRemont: !state.inputAddNumberOpenRemont,
      };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // ДЛЯ ПЕРЕМЕННОЙ ОШИБОК
    case CHANGE_VALUE_IS_ERROR_EXIST_REDUSER:
      return {
        ...state,
        isEroorExistsReduser:
          state.isEroorExistsReduser + action.payload.valueErrorPlus,
      };

    case CHANGE_VALUE_IS_ERROR_EXIST_REDUSER_ZERO:
      return {
        ...state,
        isEroorExistsReduser:
          state.isEroorExistsReduser - state.isEroorExistsReduser,
      };

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // ДЕФОЛТ
    default:
      // throw new Error()
      return state;
  }
};
