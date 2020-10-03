export const loadState = () => {
  try {
    let serializedState;

    if (localStorage.getItem('state')) {
      serializedState = localStorage.getItem('state');
    } else if (sessionStorage.getItem('state')) {
      serializedState = sessionStorage.getItem('state');
    }

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    if (state.auth.rememberMe && state.auth.isAuth) {
      localStorage.setItem('state', serializedState);
    } else if (!state.auth.rememberMe && state.auth.isAuth) {
      sessionStorage.setItem('state', serializedState);
    }
  } catch (e) {
    // ignore errors
  }
}

export const clearStorage = () => {
  localStorage.removeItem('state');
  sessionStorage.removeItem('state');
}
