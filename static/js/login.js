function login(username, password) {
    alert(`Logging in with ${username} and ${password}.`);
}
export function loadFunctions() {
    window.login = login;
}
