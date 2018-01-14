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
  
  /* more optional properties like: */
  
  // helpHandler: (req, res) => {},
  // helpText: 'The is a help message',
  // scopes: ['users:read'],
  // responseType: 'in_channel' or 'ephemeral',
});

module.exports = command;

```

#### Slash Command properties
|Property|type| Description|Required| 
|:-------|:---:|:-----------|:---:|
|name|String|the name of the command, should include '/'|required| 
|handler|Function|the handler of the command|required|
|helpText|String|the text will display if typing `/<command-name> help`|optional|
|helpHandler|Function|instead of using `helpText`, helpHanlder can implement a complicated help message|optional|
|scopes|Array|currently supports: `['users:read']` only, if this scope is set, if will retrieve the `userInfo` (with `is_admin`, `is_owner` inside)|optional|
|responseType|String| `in_channel` or `ephemeral`. `ephemeral` message only visible by the user, otherwise visible to users in the channel|optional, default: `ephemeral`|
 
 #### Slash Command Handler request
 The command handler accepts a `req` parameter, that `req` parameter contains the properties: 
|Property|type|Description|  
|:-------|:--:|:----------|  
|a|b|c|
 
