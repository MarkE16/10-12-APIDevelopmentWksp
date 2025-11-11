function login(username: string, password: string): void {
  alert(`Logging in with ${username} and ${password}.`);
}

export function loadFunctions() {
  window.login = login;
}

// This is so that TypeScript knows about the login function on the window object
declare global {
  interface Window {
    login(username: string, password: string): void;
  }
}
