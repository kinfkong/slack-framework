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
| logLevel                       | the log level for the framework lib | info |

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
|Property|type|Description|Required| 
|:-------|:---:|:-----------|:---:|
|name|String|the name of the command, should include '/'|required| 
|handler|Function|the handler of the command|required|
|helpText|String|the text will display if typing `/<command-name> help`|optional|
|helpHandler|Function|instead of using `helpText`, helpHanlder can implement a complicated help message|optional|
|scopes|Array|currently supports: `['users:read']` only, if this scope is set, if will retrieve the `userInfo` (with `is_admin`, `is_owner` inside)|optional|
|responseType|String| `in_channel` or `ephemeral`. `ephemeral` message only visible by the user, otherwise visible to users in the channel|optional, default: `ephemeral`|
 
 #### Slash Command Handler request
 The command handler accepts a `req` parameter, that `req` parameter contains the properties:      
```json
{
  "token": "Ir05ibwfdX50S8yNxSR05Zi9",
  "team_id": "T8RFNGMJB",
  "team_domain": "tc-kk-test",
  "channel_id": "C8QBNCBUK",
  "channel_name": "general",
  "user_id": "U8R9QAGKG",
  "user_name": "jinggangw",
  "command": "/hello",
  "text": "",
  "response_url": "https://hooks.slack.com/commands/T8RFNGMJB/298965475847/XToCyulQMRFcmyBuwrUysQ78",
  "trigger_id": "298023524053.297532565623.c3c8656598a4814fb4e902f80ae31b09",
  "userInfo": {
    "id": "U8R9QAGKG",
    "team_id": "T8RFNGMJB",
    "name": "jinggangw",
    "deleted": false,
    "color": "9f69e7",
    "real_name": "Jinggang",
    "tz": "America/Los_Angeles",
    "tz_label": "Pacific Standard Time",
    "tz_offset": -28800,
    "profile": {
      "real_name": "Jinggang",
      "display_name": "",
      "avatar_hash": "g31792dd765e",
      "status_text": "help",
      "status_emoji": ":speech_balloon:",
      "real_name_normalized": "Jinggang",
      "display_name_normalized": "",
      "image_24": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0019-24.png",
      "image_32": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=32&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0019-32.png",
      "image_48": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=48&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0019-48.png",
      "image_72": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0019-72.png",
      "image_192": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0019-192.png",
      "image_512": "https://secure.gravatar.com/avatar/31792dd765ec909b647ba39ac3d8e672.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0019-512.png",
      "team": "T8RFNGMJB"
    },
    "is_admin": true,
    "is_owner": true,
    "is_primary_owner": true,
    "is_restricted": false,
    "is_ultra_restricted": false,
    "is_bot": false,
    "updated": 1515832266,
    "is_app_user": false,
    "has_2fa": false
  }
}
```

*Note: the `userInfo` exists only when `scopes: ['users:read']` is set in the command's definition.* 