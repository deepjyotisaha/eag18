// Chat Application JavaScript
class ChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatForm = document.getElementById('chat-form');
        this.messageInput = document.getElementById('message-input');
        this.sendBtn = document.getElementById('send-btn');
        this.isProcessing = false;
        this.statusPollingInterval = null;
        
        this.initializeEventListeners();
        this.autoResizeTextarea();
    }

    initializeEventListeners() {
        // Form submission
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Enter key handling
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Starter prompt buttons
        document.querySelectorAll('.prompt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.getAttribute('data-prompt');
                this.messageInput.value = prompt;
                this.messageInput.focus();
            });
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
        });

        // Header action buttons
        document.querySelector('.btn-icon[title="Clear Conversation"]').addEventListener('click', () => {
            this.clearChat();
        });

        document.querySelector('.btn-icon[title="Export Chat"]').addEventListener('click', () => {
            this.exportChat();
        });
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.autoResizeTextarea();

        // Show typing indicator
        const typingIndicator = this.showTypingIndicator();

        // Disable input during processing
        this.setProcessingState(true);

        // Start polling for status updates
        this.startStatusPolling();

        try {
            const response = await this.callAPI(message);
            this.hideTypingIndicator(typingIndicator);
            this.addMessage(response, 'agent');
        } catch (error) {
            this.hideTypingIndicator(typingIndicator);
            this.addMessage('I apologize, but I encountered an error processing your request. Please try again.', 'agent');
            console.error('API Error:', error);
        } finally {
            this.setProcessingState(false);
            // Stop polling after a delay to allow final status update
            setTimeout(() => this.stopStatusPolling(), 3000);
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'brain'}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">
                    ${this.formatMessage(content)}
                </div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Convert URLs to links
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Convert line breaks to <br> tags
        content = content.replace(/\n/g, '<br>');
        
        // Convert markdown-style code blocks
        content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        
        // Convert inline code
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        return content;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message agent-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-brain"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }

    hideTypingIndicator(typingIndicator) {
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
    }

    setProcessingState(processing) {
        this.isProcessing = processing;
        this.sendBtn.disabled = processing;
        this.messageInput.disabled = processing;
        
        if (processing) {
            this.sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        } else {
            this.sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }
    }

    async callAPI(message) {
        try {
            const response = await fetch('http://127.0.0.1:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response || 'I apologize, but I didn\'t receive a response from the system. Please try again.';
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    clearChat() {
        if (confirm('Clear conversation history?')) {
            const welcomeMessage = this.chatMessages.querySelector('.agent-message');
            const starterPrompts = this.chatMessages.querySelector('.starter-prompts');
            
            this.chatMessages.innerHTML = '';
            
            if (welcomeMessage) {
                this.chatMessages.appendChild(welcomeMessage);
            }
            if (starterPrompts) {
                this.chatMessages.appendChild(starterPrompts);
            }
        }
    }

    exportChat() {
        const messages = this.chatMessages.querySelectorAll('.message:not(.typing-indicator)');
        let exportText = 'EAG18 Conversation Export\n';
        exportText += '==========================\n\n';
        
        messages.forEach(message => {
            const isUser = message.classList.contains('user-message');
            const content = message.querySelector('.message-text').textContent;
            const time = message.querySelector('.message-time').textContent;
            
            exportText += `[${time}] ${isUser ? 'You' : 'EAG18'}: ${content}\n\n`;
        });
        
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eag18-conversation-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    startStatusPolling() {
        if (this.statusPollingInterval) return;
        this.statusPollingInterval = setInterval(() => this.fetchAgentStatus(), 1000);
        this.fetchAgentStatus(); // Initial fetch
    }

    stopStatusPolling() {
        if (this.statusPollingInterval) {
            clearInterval(this.statusPollingInterval);
            this.statusPollingInterval = null;
        }
    }

    async fetchAgentStatus() {
        try {
            const response = await fetch('http://127.0.0.1:5000/status');
            if (!response.ok) throw new Error('Failed to fetch agent status');
            const status = await response.json();
            this.updateAgentStatus(status);
        } catch (e) {
            // Optionally handle error
        }
    }

    updateAgentStatus(status) {
        const sidebar = document.querySelector('.right-sidebar .sidebar-content');
        if (!sidebar) return;
        let html = '';

        if (status.status === 'starting') {
            html = `
                <div style="padding: 15px; background: #fef9c3; border-radius: 8px; margin: 10px 0;">
                    <h4 style="margin: 0 0 10px 0; color: #b45309;">
                        <i class="fas fa-hourglass-start"></i> Agent is starting...
                    </h4>
                    <p>Preparing agent and planning steps...</p>
                </div>
            `;
        } else if (status.plan && status.plan.length > 0) {
            // Build a map of node id to node info for quick lookup
            const nodeMap = {};
            status.plan.forEach(node => { nodeMap[node.id] = node; });
            // Build adjacency for edges
            const edgeMap = {};
            status.edges && status.edges.forEach(edge => {
                if (!edgeMap[edge.source]) edgeMap[edge.source] = [];
                edgeMap[edge.source].push(edge.target);
            });
            // Render nodes as boxes in a vertical list, with arrows for dependencies
            html = `<div style="padding: 10px;">
                <h4 style="margin-bottom: 10px;">Plan (DAG)</h4>
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    ${status.plan.map(node => {
                        let color = '#f3f4f6';
                        let icon = '⏳';
                        if (node.status === 'completed') { color = '#d1fae5'; icon = '✅'; }
                        else if (node.status === 'failed') { color = '#fee2e2'; icon = '❌'; }
                        else if (node.status === 'running') { color = '#f0f8ff'; icon = '🔄'; }
                        return `
                            <div id="dag-node-${node.id}" style="margin-bottom: 8px; padding: 8px 12px; border-radius: 6px; background: ${color}; font-weight: ${node.status === 'running' ? 'bold' : 'normal'}; color: ${node.status === 'failed' ? '#b91c1c' : node.status === 'running' ? '#2563eb' : '#374151'}; border: 1px solid #e5e7eb; position: relative; min-width: 220px;">
                                <span style="margin-right: 6px;">${icon}</span>
                                <strong>${node.agent}</strong>: ${node.description}
                                ${node.status === 'running' ? '<span style="margin-left:8px; color:#2563eb;">(Running)</span>' : ''}
                                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">ID: ${node.id}</div>
                            </div>
                            ${edgeMap[node.id] ? edgeMap[node.id].map(target => `
                                <div style="margin-left: 30px; margin-bottom: -8px; font-size: 18px; color: #a3a3a3;">↓</div>
                            `).join('') : ''}
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 10px;">
                    <strong>Progress:</strong> ${status.progress.completed}/${status.progress.total} (${status.progress.percentage}%)
                </div>
                <div>
                    <strong>Elapsed:</strong> ${status.execution_time}s
                </div>
            </div>`;
        } else {
            html = `
                <div class="placeholder-content">
                    <i class="fas fa-chart-line"></i>
                    <p>Execution Analytics</p>
                    <small>Monitor agent performance, execution flow, and system metrics in real-time</small>
                </div>
            `;
        }
        sidebar.innerHTML = html;
    }
}

// Initialize the chat application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});

// Add sophisticated CSS for code blocks and links
const style = document.createElement('style');
style.textContent = `
    .message-text pre {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 8px;
        padding: 16px;
        margin: 12px 0;
        overflow-x: auto;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.5;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    
    .message-text code {
        background: rgba(148, 163, 184, 0.1);
        border: 1px solid rgba(148, 163, 184, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        font-size: 13px;
        color: #334155;
    }
    
    .message-text a {
        color: #3b82f6;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all 0.2s ease;
        font-weight: 500;
    }
    
    .message-text a:hover {
        color: #2563eb;
        border-bottom-color: #3b82f6;
    }
    
    .user-message .message-text a {
        color: rgba(255, 255, 255, 0.9);
        border-bottom-color: rgba(255, 255, 255, 0.5);
    }
    
    .user-message .message-text a:hover {
        color: #ffffff;
        border-bottom-color: rgba(255, 255, 255, 0.8);
    }
    
    .user-message .message-text code {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        color: #ffffff;
    }
    
    .user-message .message-text pre {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #ffffff;
    }
`;
document.head.appendChild(style);
