const initialState = {
  userId: null,
  fullName: "",
  email: "",
  image: null,
  agentId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userId: action.payload.userId,
        fullName: action.payload.fullName,
        email: action.payload.email,
        image: action.payload.image,
      };
    case "SET_AGENT_ID":
      return {
        ...state,
        agentId: action.payload.agentId,
      };
    default:
      return state;
  }
};

export default reducer;
