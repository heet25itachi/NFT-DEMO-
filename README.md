# NFT Launchpad AI

NFT Launchpad AI is a web application that allows users to create, launch, and trade unique NFTs within a simulated multi-user marketplace. It leverages the power of Google's Gemini API to generate both the NFT artwork from a text prompt and its corresponding metadata (name, description, attributes).

This project is built as a frontend-only application, using local storage to persist all user and NFT data, creating a complete end-to-end user experience without needing a backend.

## Features

- **AI-Powered NFT Generation**: Uses Gemini to generate unique images (`imagen-3.0`) and rich metadata (`gemini-2.5-flash`) from a single text prompt.
- **Multi-User Authentication**: A full login and signup system for users. The marketplace is only accessible to authenticated users.
- **User Profiles and Wallets**: Each user has a profile page showing their collection, created items, and detailed transaction history. A simulated wallet balance is used for all transactions.
- **Simulated Marketplace**: A gallery view of all created NFTs, showing their current price and status.
- **Full Buy/Sell Lifecycle with 30% Fee**:
    - **Mint & List**: Create a new NFT and list it for sale.
    - **Purchase**: Simulate purchasing an NFT, which transfers ownership and updates wallet balances.
    - **Platform Commission**: All sales include a 30% platform fee, which is transparently recorded in the transaction history.
    - **Post-Purchase Engagement**: Unlock a unique, AI-generated quiz (a "quest") after purchasing an NFT to earn points.
    - **Secondary Market**: Owners can re-list their NFTs for sale at a new price.
- **Persistent Data**: All users and created NFTs are saved in the browser's local storage, so your marketplace persists across sessions.
- **Dynamic Price History**: Each NFT has a detailed history of its listing, sale, and re-listing prices, including fee breakdowns, simulating market value changes.
- **Simulated Admin Panel**: A password-protected admin area to view all NFT and user data in the system.

## Technical Stack

- **Framework**: React
- **Language**: TypeScript
- **AI Models**: Google Gemini API (`gemini-2.5-flash` for text, `imagen-3.0-generate-002` for images)
- **Styling**: Tailwind CSS for a modern, responsive design.
- **Build/Dependencies**: No build step needed; uses ES Modules (ESM) via `esm.sh` for package management directly in the browser.

## Getting Started

### Prerequisites

You need a Google Gemini API key to run this application.

1.  Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get your API key.
2.  **Important**: This project uses a `process.env` placeholder. In a real-world scenario, you would use a build tool like Vite or Create React App to manage environment variables. For simple local testing, you can hardcode your key, but **never** commit it to a public repository.

### Running Locally

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set your API Key:**
    In a real project, you'd create a `.env` file. For this project's setup, you'll need to manually replace `process.env.API_KEY` in `services/geminiService.ts` with your actual key for local testing.
    
    *Open `services/geminiService.ts` and find the line:*
    ```javascript
    const API_KEY = process.env.API_KEY; 
    ```
    *Replace it with:*
    ```javascript
    const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
    ```

3.  **Serve the `index.html` file:**
    You need a simple local server to run the project due to browser security policies (CORS). You can use a tool like `live-server` for this.
    - If you don't have it, install it via npm:
      ```bash
      npm install -g live-server
      ```
    - Run it from the project's root directory:
      ```bash
      live-server
      ```
    - It will automatically open the application in your browser.

## Deployment to GitHub Pages (Free)

You can deploy this application for free using GitHub Pages.

1.  **Create a GitHub Repository:**
    - Create a new repository on GitHub.
    - Upload all the project files (`index.html`, `App.tsx`, etc.) to this new repository.

2.  **Configure GitHub Pages:**
    - In your repository on GitHub, go to `Settings` > `Pages`.
    - Under the "Build and deployment" section, for "Source", select `Deploy from a branch`.
    - For "Branch", select `main` (or your default branch) and `/ (root)` for the folder.
    - Click `Save`.

3.  **Add Your API Key as a Repository Secret:**
    - **This step is crucial for security and functionality on the live app.**
    - In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
    - Click `New repository secret`.
    - For the name, enter `VITE_GEMINI_API_KEY`.
    - For the value, paste your Google Gemini API key.
    - Click `Add secret`.

4.  **Create a GitHub Actions Workflow for Deployment:**
    - In your repository, create a new file: `.github/workflows/deploy.yml`.
    - Paste the following content into that file:

    ```yml
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - main # Or your default branch

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout 🛎️
            uses: actions/checkout@v3

          - name: Set up Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18'

          - name: Install dependencies
            run: npm install

          - name: Replace API Key placeholder
            run: |
              sed -i "s|process.env.API_KEY|'${{ secrets.VITE_GEMINI_API_KEY }}'|g" services/geminiService.ts

          - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@v4
            with:
              branch: gh-pages # The branch the action should deploy to
              folder: . # The folder the action should deploy
    ```

    - Commit and push this new file to your repository. The Action will automatically run, replace the API key placeholder with your secret, and deploy the files to the `gh-pages` branch.

5.  **Update Pages Source:**
    - Go back to your repository's `Settings` > `Pages`.
    - Change the source branch to `gh-pages`.
    - Your site will be live at the provided URL in a few minutes!