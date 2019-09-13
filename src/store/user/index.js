// Initial state
export const userInitialState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  activeSubscription: null,
  isRegistrationInProgress: false
};

// Reducer
export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
