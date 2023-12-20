export const initialState = {
  data: [],
  waiting: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "oneComments/load-success":
      return {...state, data: [...state.data, action.payload.data], waiting: false};

    case "comments/load-error":
      return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

    default:

      return state;
  }
}

export default reducer;