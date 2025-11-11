async function login() {
  const input = document.getElementById("username") as HTMLInputElement;
  const username = input.value.trim();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  if (res.ok) {
    window.location.href = "/chat";
  } else {
    alert("Login failed");
  }
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
