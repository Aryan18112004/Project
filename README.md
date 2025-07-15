## PwC Portal Navigator – README
### Overview
PwC Portal Navigator is a Chrome extension that leverages AI to help users quickly search, navigate, and troubleshoot PwC’s major internal portals. It uses a secure backend to access the OpenAI API, keeping credentials safe and enabling smart, contextual answers.

### Features
AI-powered Search: Ask any PwC portal-related question and get concise guidance.

Quick Actions: One-click help for logins, navigation, and troubleshooting.

Portal Shortcuts: Instantly open frequently used PwC portals.

Contextual Help Overlay: In-portal help for quicker task guidance.

### Project Structure
text
pwc-portal-navigator/
│
├── backend/
│   ├── .env
│   └── index.js
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── content.js
├── background.js
└── assets/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
    
### Prerequisites

Node.js (v16 or higher) and npm

Google Chrome (latest)

A valid OpenAI API key

### 1. Backend Setup
Go to /backend in your terminal

Install backend dependencies:

npm install express axios dotenv cors
Create a .env file in /backend:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
PORT=5000
(Replace with your actual OpenAI API key)

Start the backend server:

node index.js
You should see PwC Navigator backend running on port 5000 in the terminal.

### 2. Chrome Extension Setup
Place all extension files (except /backend) in a single directory, following the structure above.

Add PNG icons in /assets for 16x16, 48x48, and 128x128.

Confirm popup.js points to your backend:

const BACKEND_URL = 'http://localhost:5000/api/ask';
Open Chrome and navigate to chrome://extensions/

Turn on Developer Mode (top right)

Click Load unpacked and select your project folder.

The extension icon will now appear on your toolbar.

### 3. Using the Extension
Click the extension icon in Chrome.

Type questions (e.g., "How do I upload a file to the advisory portal?") and hit Search.

Use Quick Actions for instant self-help.

Use Portal Shortcuts to open key PwC portal pages.

In context, overlays and help buttons will appear inside supported PwC portals.

### 4. Notes & FAQ
Backend must be running for AI-powered answers.

For remote backend use, update BACKEND_URL in popup.js to point to your deployed backend.

Do not expose your OpenAI API key in any client-side code.

If you face CORS or network issues, ensure your backend is accessible and restart Chrome if needed.

You can add your own FAQ, quick tips, or update content as needed.

### 5. Troubleshooting
Problem	Solution
No answer/timeout in popup	Ensure backend server is running and reachable.
"npm" not found	Install Node.js and npm (nodejs.org)
Wrong/old answer	Refresh the backend server to update any changes.
Icons missing	Add PNG files to /assets with correct names & sizes.
6. Customization
To add more portals, edit portalKnowledge in popup.js and adjust content in content.js.

To deploy backend to cloud/VPS, update BACKEND_URL in popup.js to use your remote server.

For security, avoid committing .env with your API key to any public repositories.
