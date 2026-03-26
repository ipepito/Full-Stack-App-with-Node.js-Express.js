async function login() {
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
           
            sessionStorage.setItem('authToken', data.token);
            
            
            document.body.classList.remove('not-authenticated');
            document.body.classList.add('authenticated');
            document.body.classList.add(data.user.role); // Adds 'admin' or 'user'

            messageElement.innerText = `Login successful! Role: ${data.user.role}`;
            messageElement.className = "text-center mt-3 text-success";
        } else {
            // 5. Handle errors (Matches your image)
            messageElement.innerText = 'Login failed: ' + (data.error || 'Unknown error');
            messageElement.className = "text-center mt-3 text-danger";
        }
    } catch (err) {
        console.error(err);
        messageElement.innerText = 'Network error: Is your server running?';
    }
}
