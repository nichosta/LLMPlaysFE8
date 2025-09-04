import fetch from 'node-fetch';
import { API_CONFIG, TIMING, CONVERSATION, PROMPTS } from './constants.js';
import { pressButtons } from './tools/buttonPress.js';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

class GameAgent {
    constructor(model = API_CONFIG.DEFAULT_MODEL) {
        this.model = model;
        this.conversationHistory = [];
        this.maxHistoryLength = CONVERSATION.MAX_HISTORY_LENGTH;
        
        if (!OPENROUTER_API_KEY) {
            throw new Error('OPENROUTER_API_KEY environment variable is required');
        }
    }

    addMessage(role, content) {
        this.conversationHistory.push({ role, content });
        
        // Trim history if it gets too long, but keep system message
        if (this.conversationHistory.length > this.maxHistoryLength) {
            const systemMessage = this.conversationHistory.find(msg => msg.role === 'system');
            const recentMessages = this.conversationHistory.slice(-this.maxHistoryLength + 1);
            
            this.conversationHistory = systemMessage 
                ? [systemMessage, ...recentMessages]
                : recentMessages;
        }
    }

    async sendRequest(userMessage) {
        try {
            this.addMessage('user', userMessage);

            const response = await fetch(API_CONFIG.OPENROUTER_BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://github.com/anthropics/claude-code',
                    'X-Title': 'LLM Plays FE8'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: this.conversationHistory,
                    temperature: API_CONFIG.TEMPERATURE,
                    max_tokens: API_CONFIG.MAX_TOKENS
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            const assistantMessage = data.choices[0]?.message?.content;

            if (!assistantMessage) {
                throw new Error('No response content received from LLM');
            }

            this.addMessage('assistant', assistantMessage);
            
            try {
                // The response might be inside a code block, so we need to extract it.
                const jsonMatch = assistantMessage.match(/```json\n([\s\S]*?)\n```/);
                const jsonString = jsonMatch ? jsonMatch[1] : assistantMessage;
                return JSON.parse(jsonString);
            } catch (parseError) {
                console.error('Error parsing LLM response JSON:', parseError.message);
                console.error('LLM Response was:', assistantMessage);
                throw new Error('Failed to parse LLM response as JSON.');
            }

        } catch (error) {
            console.error('Error in LLM request:', error.message);
            throw error;
        }
    }

    setSystemMessage(systemPrompt) {
        // Remove existing system message if present
        this.conversationHistory = this.conversationHistory.filter(msg => msg.role !== 'system');
        // Add new system message at the beginning
        this.conversationHistory.unshift({ role: 'system', content: systemPrompt });
    }

    getConversationHistory() {
        return [...this.conversationHistory]; // Return a copy
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    async runGameLoop() {
        console.log('Starting Fire Emblem 8 AI Agent...');
        console.log(`Using model: ${this.model}`);

        // Set up initial system prompt
        this.setSystemMessage(PROMPTS.SYSTEM);

        let lastUserMessage = PROMPTS.INITIAL_TURN;

        while (true) {
            try {
                const structuredResponse = await this.sendRequest(lastUserMessage);
                
                console.log('AI Reasoning:', structuredResponse.reasoning);
                console.log('AI Plan:', structuredResponse.plan);

                const { tool_name, parameters } = structuredResponse.tool_call;

                let actionResult = 'OK';

                if (tool_name === 'pressButtons') {
                    console.log(`Executing action: pressButtons(${JSON.stringify(parameters.buttons)})`);
                    await pressButtons(parameters.buttons);
                } else {
                    console.warn(`Unknown tool: ${tool_name}`);
                    actionResult = `Unknown tool called: ${tool_name}`;
                }
                
                // Prepare for next turn
                // For now, we don't have observation gathering, so we'll just send a generic message.
                // In the future, this would include screenshot analysis or memory reads.
                lastUserMessage = `The last action (${tool_name}) was executed with result: ${actionResult}. What is the next step based on your plan?`;

                await new Promise(resolve => setTimeout(resolve, TIMING.TURN_INTERVAL));
                
            } catch (error) {
                console.error('An error occurred in the game loop:', error.message);
                lastUserMessage = PROMPTS.ERROR_RECOVERY;
                await new Promise(resolve => setTimeout(resolve, TIMING.ERROR_RETRY_DELAY));
            }
        }
    }
}

// Example usage
if (import.meta.url === `file://${process.argv[1]}`) {
    const agent = new GameAgent();
    agent.runGameLoop();
}

export default GameAgent;
