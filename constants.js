// API Configuration
export const API_CONFIG = {
    OPENROUTER_BASE_URL: 'https://openrouter.ai/api/v1/chat/completions',
    DEFAULT_MODEL: 'google/gemini-2.5-flash-image-preview:free',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7
};

// Game Loop Timing (in milliseconds)
export const TIMING = {
    TURN_INTERVAL: 5000,        // Time between AI turns
    BUTTON_DELAY: 500,          // Default delay between button presses
    SCREENSHOT_DELAY: 1000,     // Wait time after actions before screenshot
    MEMORY_READ_INTERVAL: 2000, // How often to read game state
    ERROR_RETRY_DELAY: 3000     // Wait time before retrying after errors
};

// Conversation Management
export const CONVERSATION = {
    MAX_HISTORY_LENGTH: 20,     // Maximum messages to keep in history
    SYSTEM_MESSAGE_PRIORITY: true // Always keep system message
};

// System Prompts
export const PROMPTS = {
    SYSTEM: `You are an AI agent playing Fire Emblem: The Sacred Stones, a tactical RPG.

Your capabilities:
- Read game memory to understand current state
- Press buttons to control the game
- Take screenshots to see the current screen
- Make strategic decisions based on game information

Your goals:
- Play the game intelligently and strategically
- Make tactical decisions in battles
- Manage units, items, and resources effectively
- Progress through the story

Output format:
You MUST respond in a structured JSON format. Your response must be a single JSON object with the following keys:
- "reasoning": A string explaining your thought process and analysis of the current situation.
- "plan": An array of strings outlining your next few steps.
- "tool_call": An object representing the action to take this turn. It must have:
  - "tool_name": The name of the tool to use (e.g., "pressButtons").
  - "parameters": An object containing the parameters for the tool. For "pressButtons", the parameter is "buttons", which is an array of strings (e.g., ["A", "Down", "Down", "A"]).

Example response:
{
  "reasoning": "The game has just started. I need to navigate the main menu to start a new game. I will press 'A' to get past the title screen, then navigate down to 'New Game'.",
  "plan": [
    "Select 'New Game' from the main menu.",
    "Choose a difficulty.",
    "Watch the opening cutscene."
  ],
  "tool_call": {
    "tool_name": "pressButtons",
    "parameters": {
      "buttons": ["A"]
    }
  }
}

Guidelines:
- Analyze the current situation before acting.
- Be concise but thorough in your responses.
- Focus on actionable next steps
- Ask for clarification if the game state is unclear`,

    INITIAL_TURN: `You are now controlling Fire Emblem: The Sacred Stones. The game should be loaded and ready at the title screen.

What is your first action? Provide your response in the required JSON format.`,

    ERROR_RECOVERY: `An error occurred in the previous action. Please:
1. Assess what went wrong
2. Suggest an alternative approach
3. Try a simpler action if the previous one was complex`,

    BATTLE_STRATEGY: `You are now in a battle scenario. Consider:
- Unit positions and movement ranges
- Enemy threats and weaknesses  
- Terrain advantages
- Available items and abilities
- Win conditions for this map

Plan your next move strategically.`,

    MENU_NAVIGATION: `You appear to be in a menu or dialogue. Consider:
- What options are available
- What information is being presented
- What your current objective should be
- Whether you need to make a selection or cancel

Decide on the appropriate menu action.`
};

// Game-Specific Constants
export const GAME = {
    EXPECTED_TITLE: "Fire Emblem: The Sacred Stones",
    FRAME_RATE: 60,             // GBA runs at ~60 FPS
    BUTTON_HOLD_FRAMES: 15,     // Default frames to hold button (from Lua script)
    MEMORY_CHUNK_SIZE: 1024     // Max bytes per memory read request
};

// Memory Addresses (to be expanded as needed)
export const MEMORY_ADDRESSES = {
    // These will need to be researched and added based on FE8 memory map
    GAME_STATE: 0x0202BCF0,     // Example - needs verification
    CURRENT_CHAPTER: 0x0202A4D2, // Example - needs verification
    GOLD_AMOUNT: 0x0202A4D4,    // Example - needs verification
    // TODO: Add more addresses as they are discovered
};

// Button mappings (matching the button press tool)
export const BUTTONS = {
    A: 'A',
    B: 'B', 
    L: 'L',
    R: 'R',
    START: 'Start',
    SELECT: 'Select',
    UP: 'Up',
    DOWN: 'Down',
    LEFT: 'Left',
    RIGHT: 'Right'
};

// Common button sequences for menu navigation
export const BUTTON_SEQUENCES = {
    CONFIRM: [BUTTONS.A],
    CANCEL: [BUTTONS.B],
    MENU_UP: [BUTTONS.UP],
    MENU_DOWN: [BUTTONS.DOWN],
    PAUSE_MENU: [BUTTONS.START],
    RESET_TO_TITLE: [BUTTONS.START, BUTTONS.SELECT, BUTTONS.A, BUTTONS.B] // Soft reset
};