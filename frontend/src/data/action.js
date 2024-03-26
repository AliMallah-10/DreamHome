export const loginSuccess = (userId, fullName, email, image) => ({
  type: "LOGIN_SUCCESS",
  payload: { userId, fullName, email, image },
});
export const setAgentIdUse = (agentId) => ({
  type: "SET_AGENT_ID",
  payload: { agentId },
});
