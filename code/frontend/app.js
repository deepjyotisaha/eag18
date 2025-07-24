document.getElementById('agent-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const responseBox = document.getElementById('response');
    responseBox.textContent = "Thinking...";

    try {
        const res = await fetch('http://127.0.0.1:5000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: query })
        });
        const data = await res.json();
        responseBox.textContent = data.response;
        if (data.log) {
            const logBox = document.getElementById('log');
            logBox.innerHTML = data.log.map(step => `<div>${step}</div>`).join('');
        }
    } catch (err) {
        responseBox.textContent = "Error: Could not reach the agent.";
    }
});
