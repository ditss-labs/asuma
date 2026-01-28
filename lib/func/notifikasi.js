import axios from 'axios';

const API_BASE_URL = `${global.api.domain}/v1/notifyy`;

export async function sendNotification(message) {
    if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
    }
    
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { message }
        });
        
        const data = response.data;
        
        return {
            success: data.status === true,
            message: data.message,
            creator: data.creator,
            data: data.data,
            timestamp: new Date().toISOString(),
            response: data
        };
        
    } catch (error) {
        console.error('Notification error:', error.message);
        
        return {
            success: false,
            message: error.response?.data?.message || error.message,
            timestamp: new Date().toISOString()
        };
    }
}

export async function sendFormattedNotification(type, content) {
    const icons = {
        info: 'ℹ️',
        warning: '⚠️',
        error: '🚨',
        success: '✅',
        debug: '🐛'
    };
    
    const icon = icons[type] || '📢';
    const formattedMessage = `${icon} [${type.toUpperCase()}] ${content}`;
    
    return await sendNotification(formattedMessage);
}

export async function sendServerStatus(status) {
    const { uptime, cpu, memory, disk, services = [] } = status;
    
    const message = `🖥️ SERVER STATUS
Uptime: ${uptime}
CPU: ${cpu}%
Memory: ${memory}%
Disk: ${disk}%
Services: ${services.join(', ')}`;
    
    return await sendNotification(message);
}

export async function sendErrorAlert(error, context = 'System') {
    const errorMessage = `🚨 ${context} ERROR: ${error.message}
Time: ${new Date().toLocaleString()}
Stack: ${error.stack ? error.stack.substring(0, 200) + '...' : 'No stack trace'}`;
    
    return await sendNotification(errorMessage);
}

export async function sendWithRetry(message, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}`);
            const result = await sendNotification(message);
            
            if (result.success) {
                return result;
            }
            
            lastError = new Error(result.message);
        } catch (error) {
            lastError = error;
        }
        
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    
    throw lastError || new Error('Failed after all retries');
}

export async function testNotification() {
    console.log('Testing notification service...');
    
    const result = await sendNotification('Test notification from system 🧪');
    
    if (result.success) {
        console.log('Notification test passed!');
        console.log('Delivered:', result.data.delivered);
        console.log('Timestamp:', result.data.timestamp);
    } else {
        console.log('Notification test failed:', result.message);
    }
    
    return result;
}

export async function sendBatchNotifications(messages, delayMs = 1000) {
    const results = [];
    
    for (let i = 0; i < messages.length; i++) {
        console.log(`Sending notification ${i + 1}/${messages.length}`);
        const result = await sendNotification(messages[i]);
        results.push(result);
        
        if (i < messages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    
    return results;
}

export async function sendPostNotification(data) {
    try {
        const response = await axios.post(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

class NotificationService {
    constructor() {
        this.lastSent = 0;
        this.minInterval = 5000;
        this.axiosInstance = axios.create({
            timeout: 10000,
            headers: {
                'User-Agent': 'NotificationService/1.0'
            }
        });
    }
    
    async sendWithRateLimit(message) {
        const now = Date.now();
        const timeSinceLast = now - this.lastSent;
        
        if (timeSinceLast < this.minInterval) {
            const waitTime = this.minInterval - timeSinceLast;
            console.log(`Rate limiting: waiting ${waitTime}ms`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        this.lastSent = Date.now();
        return await sendNotification(message);
    }
    
    async sendWithTimeout(message, timeout = 5000) {
        try {
            const response = await axios.get(API_BASE_URL, {
                params: { message },
                timeout: timeout
            });
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const notificationService = new NotificationService();

export default {
    sendNotification,
    sendFormattedNotification,
    sendServerStatus,
    sendErrorAlert,
    sendWithRetry,
    testNotification,
    sendBatchNotifications,
    sendPostNotification,
    notificationService
};
