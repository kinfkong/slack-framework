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

// set the configurations
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
#### Slack's configuration options
| Name                           | Description                                | Default                          |
| :----------------------------- | :----------------------------------------  | :------------------------------: |
| clientID                       | the slack app's client ID    |  None                            |
| clientSecret                   | the slack app's client secret                           |  None                            |
| verificationToken              | the slack app's verification token                             |  None                            |
| oauthAccessToken               | the slack app's oauth access token                            |  None                            |
| immediateMessageTimeoutLimit   | the timeout for immediate message. If the process time is longer than this value, it will send a delay message              |  2000                            |


### Define a Slash Command

```js
const slack = require('slack-framework');

const commands = slack.commands;

const command = commands.addCommand({
  // the name of the command
  name: '/hello',
  
  // the command handler 
  handler: (req, res) => {
    const message = res.createMessage(`This is a hello world message!`);
    res.send(message);
  }
});

module.exports = command;

```