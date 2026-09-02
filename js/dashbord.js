    export function dashboard(data) {
        return `
        <div class="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <p>Hello, ${data.user.username}!</p>
        </div>
        `
    };