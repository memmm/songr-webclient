# SongR - webclient

## Startup

run `npm i` to install all dependencies (you can see what will be installed in package.json)
then `npm run dev`, and in a minute you can visit localhost:3000

Next.js tutorial (better than the official):
https://auth0.com/blog/next-js-practical-introduction-for-react-developers-part-1/

## Structure

We have three pages:

- index.js: main page with register/login
- chat.js: the chat window
- settings.js: for preferences

The pages share a layout (components/Layout.js), which contains the Header.js (for the logo and showing login state)

## Style

We use React Bootstrap, which is just a wrapper over Bootstrap.
SCSS style files are used for more readable CSS - the React default CSS-in-JS is really crappy.
If you want syntax highlighting for the CSS, install VSCode plugin 'vscode-styled-components'.

## Data store

We use Redux with Redux Toolkit for internal data sotrage.

## Spotify Integration

We use Spotify's Authorization Code Flow.This flow first gets a code from the Spotify Accounts Service, then exchanges that code for an access token. The code-to-token exchange requires a secret key, and for security is done through direct server-to-server communication.
