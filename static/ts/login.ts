async function login() {
  // const input = document.getElementById("username") as HTMLInputElement;
  // const username = input.value.trim();
  // ... make API call to log in the user ...
}

document.addEventListener("DOMContentLoaded", () => {
  window.login = login;
});

// This is needed so that Typescript
// is aware of the login function
// being added to the window object
declare global {
  interface Window {
    login: () => Promise<void>;
  }
}

export {};
