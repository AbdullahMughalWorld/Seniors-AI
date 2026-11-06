# Seniors Ai

Seniors Ai is a browser-based AI assistant interface designed for
everyday work, learning, coding, and writing. It provides a chat
workspace with multiple assistant modes, conversation history,
appearance preferences, and prompt-inspection tools.

> **Deployment note:** This project is a static HTML application. The
> current AI-response integration calls `claude.use('sample')`, which is
> specific to its original Claude artifact environment. That integration
> is not automatically available on GitHub Pages or Vercel. The
> interface can be deployed as a website, but live AI responses require
> a compatible backend/API integration.

## Features

-   Chat-style interface with a conversation sidebar
-   Start new conversations and search chat history
-   Assistant modes for general help, coding, studying, and writing
-   Prompt Inspector to view the prompt configuration for the selected
    mode
-   Preferences for user name, appearance, and response tone
-   Light and dark appearance options
-   Copy/export conversation support
-   Local browser storage for conversation and preference data
-   Responsive layout for different screen sizes

## Built With

-   HTML5
-   CSS3
-   JavaScript
-   Google Fonts
-   Three.js (loaded from a CDN)

## Project Structure

``` text
Seniors-AI/
└── index.html
```

Keep `index.html` in the root of the project so static hosting platforms
can find the website entry point.

## Run Locally

1.  Download or clone this repository.
2.  Open the project folder.
3.  Open `index.html` in a modern web browser.

No package installation or build step is required for the current
standalone HTML version.

## Deploy on Vercel

1.  Push this project to a GitHub repository.
2.  Sign in to [Vercel](https://vercel.com/) using GitHub.
3.  Select **Add New → Project**.
4.  Import the `Seniors-AI` repository.
5.  Set **Framework Preset** to **Other**.
6.  Keep the root directory as `./`.
7.  For this static HTML project, leave the Build Command and Install
    Command empty. Set the Output Directory to `.` if Vercel asks for
    it.
8.  Click **Deploy**.

Vercel will provide a deployment URL after the deployment completes.

## Deploy on GitHub Pages

1.  Open the repository on GitHub.
2.  Go to **Settings → Pages**.
3.  Under **Build and deployment**, choose **Deploy from a branch**.
4.  Select the `main` branch and the `/ (root)` folder.
5.  Save the settings and wait for GitHub Pages to publish the site.

## AI Integration: Important

The current HTML file contains an environment-specific integration:

``` javascript
var sample = await claude.use('sample');
```

The `claude` object is not provided by ordinary static hosting. To
enable live AI responses outside the original environment:

1.  Create a backend endpoint (for example, using Node.js) that
    communicates with an AI provider.
2.  Store the provider API key in the backend environment variables.
3.  Send chat messages from the frontend to your backend endpoint.
4.  Return the model response to the frontend and display it in the
    conversation.

**Security:** Never place a private AI API key directly in `index.html`
or any other browser-side JavaScript. Anyone can inspect client-side
code.

## Data and Privacy

Conversation history and preferences are stored in the browser using
`localStorage`. This means the saved data is associated with the browser
and device being used. Clearing browser site data may remove locally
saved conversations and preferences. Do not use a shared or public
computer for private conversations.

## Current Limitations

-   Live AI generation depends on the original Claude artifact runtime
    and must be adapted for normal hosting.
-   The project is currently a single-page frontend; it does not include
    a configured production backend or database.
-   Features that require server-side routes or external services will
    need those services to be configured separately.

## Customization

You can customize the interface by editing `index.html`:

-   Update text, labels, and assistant descriptions.
-   Adjust colors, typography, and layout in the CSS.
-   Modify assistant modes and prompt content in the JavaScript.
-   Connect a secure backend to enable production AI functionality.

## License

No license has been specified yet. Add a license file before allowing
others to reuse, modify, or distribute this project.

------------------------------------------------------------------------

Made with care for learning, productivity, and AI exploration.
