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
    // { 'id': '1', 'title': '510009' },
    // { 'id': '2', 'title': '510087' },
    // { 'id': '3', 'title': '510061' },
    // { 'id': '4', 'title': '510196' },
    // { 'id': '5', 'title': '510216' },
    // { 'id': '6', 'title': '510254' },
    // { 'id': '7', 'title': '510075' },
    // { 'id': '8', 'title': '510190' },
    // { 'id': '9', 'title': '510255' },
    // { 'id': '10', 'title': '510103' },
    // { 'id': '11', 'title': '510235' },
    // { 'id': '12', 'title': '510229' },
    // { 'id': '13', 'title': '510141' },
    // { 'id': '14', 'title': '510247' },
    // { 'id': '15', 'title': '510119' },
    // { 'id': '16', 'title': '510012' },
    // { 'id': '17', 'title': '510129' },
    // { 'id': '18', 'title': '510022' },
    // { 'id': '19', 'title': '510192' },
    // { 'id': '20', 'title': '510081' },
    // { 'id': '21', 'title': '510169' },
    // { 'id': '22', 'title': '510079' },
    // { 'id': '23', 'title': '510031' },
    // { 'id': '24', 'title': '510252' },
    // { 'id': '25', 'title': '510173' },
    // { 'id': '26', 'title': '510214' },
    // { 'id': '27', 'title': '510090' },
    // { 'id': '28', 'title': '510005' },
    // { 'id': '29', 'title': '510193' },
    // { 'id': '30', 'title': '510004' },
    // { 'id': '31', 'title': '510032' },
    // { 'id': '32', 'title': '510217' },
    // { 'id': '33', 'title': '510189' },
    // { 'id': '34', 'title': '510093' },
    // { 'id': '35', 'title': '510084' },
    // { 'id': '36', 'title': '510224' },
    // { 'id': '37', 'title': '510221' },
    // { 'id': '38', 'title': '510231' },
    // { 'id': '39', 'title': '510082' },
    // { 'id': '40', 'title': '510160' },
    // { 'id': '41', 'title': '510227' },
    // { 'id': '42', 'title': '510152' },
    // { 'id': '43', 'title': '510115' },
    // { 'id': '44', 'title': '510168' },
    // { 'id': '45', 'title': '510015' },
    // { 'id': '46', 'title': '510138' },
    // { 'id': '47', 'title': '510120' },
    // { 'id': '48', 'title': '510225' },
    // { 'id': '49', 'title': '510248' },
    // { 'id': '50', 'title': '510263' },
    // { 'id': '51', 'title': '510113' },
    // { 'id': '52', 'title': '510244' },
    // { 'id': '53', 'title': '510186' },
    // { 'id': '54', 'title': '510143' },
    // { 'id': '55', 'title': '510186' },
    // { 'id': '56', 'title': '510045' },
    // { 'id': '57', 'title': '510083' },
    // { 'id': '58', 'title': '510112' },
    // { 'id': '60', 'title': '510211' },
    // { 'id': '61', 'title': '510118' },
    // { 'id': '62', 'title': '510228' },
    // { 'id': '63', 'title': '510036' },
    // { 'id': '64', 'title': '510175' },
    // { 'id': '65', 'title': '510201' },
    // { 'id': '66', 'title': '510128' },
    // { 'id': '67', 'title': '510016' },
    // { 'id': '68', 'title': '510007' },
    // { 'id': '69', 'title': '510267' },


    // { 'id': '71', 'title': '290804' },
    // { 'id': '72', 'title': '290803' },
    // { 'id': '73', 'title': '290707' },
    // { 'id': '74', 'title': '290601' },
    // { 'id': '75', 'title': '290017' },
    // { 'id': '76', 'title': '290800' },
    // { 'id': '77', 'title': '290502' },
    // { 'id': '78', 'title': '290057' },
    // { 'id': '79', 'title': '290001' },
    // { 'id': '80', 'title': '290013' },
    // { 'id': '81', 'title': '290009' },
    // { 'id': '82', 'title': '290503' },
    // { 'id': '83', 'title': '290007' },
    // { 'id': '84', 'title': '290033' },
    // { 'id': '85', 'title': '290015' },
    // { 'id': '86', 'title': '290027' },
    // { 'id': '87', 'title': '290802' },
    // { 'id': '88', 'title': '290055' },
    // { 'id': '89', 'title': '290020' },
    // { 'id': '90', 'title': '290024' },
    // { 'id': '91', 'title': '290019' },
    // { 'id': '92', 'title': '290029' },
    // { 'id': '93', 'title': '290003' },
    // { 'id': '94', 'title': '290002' },
    // { 'id': '95', 'title': '290061' },
    // { 'id': '96', 'title': '290041' },
    // { 'id': '97', 'title': '290806' },
    // { 'id': '98', 'title': '290809' },
    // { 'id': '99', 'title': '290051' },
    // { 'id': '100', 'title': '290705' },
    // { 'id': '101', 'title': '290022' },
    // { 'id': '102', 'title': '290005' },
    // { 'id': '103', 'title': '290038' },
    // { 'id': '104', 'title': '290011' },
    // { 'id': '105', 'title': '290044' },
    // { 'id': '106', 'title': '290030' },
    // { 'id': '107', 'title': '290025' },
    // { 'id': '108', 'title': '290706' },
    // { 'id': '109', 'title': '290501' },
    // { 'id': '110', 'title': '290050' },
    // { 'id': '111', 'title': '290037' },
    // { 'id': '112', 'title': '290006' },
    // { 'id': '113', 'title': '290063' },
    // { 'id': '114', 'title': '290060' },
    // { 'id': '115', 'title': '290012' },
    // { 'id': '116', 'title': '290018' },
    // { 'id': '117', 'title': '290035' },
    // { 'id': '118', 'title': '290021' },
    // { 'id': '119', 'title': '290701' },
    // { 'id': '120', 'title': '290801' },
    // { 'id': '121', 'title': '290703' },
    // { 'id': '122', 'title': '290004' },
    // { 'id': '123', 'title': '290058' },
    // { 'id': '124', 'title': '290040' },
    // { 'id': '125', 'title': '290807' },
    // { 'id': '126', 'title': '290014' },
    // { 'id': '127', 'title': '290016' },
    // { 'id': '128', 'title': '290059' },
    // { 'id': '129', 'title': '290010' },
    // { 'id': '130', 'title': '290028' },
    // { 'id': '131', 'title': '290052' },
    // { 'id': '132', 'title': '290053' },
    // { 'id': '133', 'title': '290045' },
    // { 'id': '134', 'title': '290039' },
    // { 'id': '135', 'title': '290808' },
    // { 'id': '136', 'title': '290043' },
    // { 'id': '137', 'title': '290049' },
    // { 'id': '138', 'title': '290047' },
    // { 'id': '139', 'title': '290036' },
    // { 'id': '140', 'title': '290805' },
    // { 'id': '141', 'title': '290056' },
    // { 'id': '142', 'title': '290603' },
    // { 'id': '143', 'title': '290042' },
    // { 'id': '144', 'title': '290600' },
    // { 'id': '145', 'title': '290702' },
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
