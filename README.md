`slack-framework` is a framework for slack's Slash Command apps and provide some utils for Slack API.
## Requirements

- node.js 8 or above is required

## Install dependencies

```shell
npm install
```

## Source code lint

eslint is used to lint the javascript source code:

```shell
npm run lint
```

## Usage

### Quick Start

```js
const slack = require('slack-framework');

// set the configs
slack.set('clientID', '***' /* Your slack app's client ID */);
slack.set('clientSecret', '***' /* Your slack app's client secret */);
slack.set('verificationToken', '***' /* Your slack app's verification token */);
slack.set('oauthAccessToken', '***' /* Your slack app's oauth access token */);

const commands = slack.commands;
const actions = slack.actions;

// load all the defined slash-commands from a directory
commands.loadCommands(path.join(__dirname, './slash-commands'));

// relies on the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set the express middlewares
app.use('/commands', commands.middlewares); // to handle the slash commands
app.use('/actions', actions.middlewares); // to handle the button/menu actions

```