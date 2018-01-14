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
  "team_id": "T8RFNGMJB",
  "team_domain": "tc-kk-test",
  "channel_id": "C8QBNCBUK",
  "channel_name": "general",
  "user_id": "U8R9QAGKG",
  "user_name": "jinggangw",
  "command": "/hello",
  "text": "",
  "userInfo": {
    "id": "U8R9QAGKG",
    "team_id": "T8RFNGMJB",
    "name": "jinggangw",
    "deleted": false,
    "real_name": "Jinggang",
    "profile": {
      "real_name": "Jinggang",
      "display_name": "",
      "status_text": "help",
      "status_emoji": ":speech_balloon:",
      "real_name_normalized": "Jinggang",
      "display_name_normalized": "",
      "team": "T8RFNGMJB"
    },
    "is_admin": true,
    "is_owner": true,
    "is_primary_owner": true,
    "is_restricted": false,
    "is_bot": false,
    "is_app_user": false
  }
}
```

*Note: the `userInfo` property exists only when `scopes: ['users:read']` is set in the command's definition.* 

### Use Inactive Components (buttons, menus) and action handlers.

```js
const slack = require('slack-framework');

const commands = slack.commands;
const actions = slack.actions;

const action = actions.addAction({
  // the name of the action, the name should be unique globally
  name: 'test-buttons',
  
  // handles the action
  handler: (req, res) => {
    // the button/menu that clicked
    const target = req.target;
    
    // create the message
    const message = res.createMessage();
    if (target.value === 'button1') {
      message.addText('You are clicking button #1');
    } else {
      message.addText('You are clicking button #2');
    }
    
    // send the message
    res.send(message);
  },
});

const command = commands.addCommand({
  name: '/show-button',
  handler: (req, res) => {
    const message = res.createMessage('This is a message!');
    const attachment = message.addAttachment('This is an attachment.');
 
    // set the action handler for the whole attachment
    attachment.setAction(action);
    
    // create the buttons
    const btn1 = attachment.addButton({name: 'test-button', text: 'Button #1', value: 'button1'});
    const btn2 = attachment.addButton({name: 'test-button', text: 'Button #2', value: 'button2'});
    
    // set extra styles
    btn1.assignIn({style: 'danger'});
    
    // send the message
    res.send(message);
  },
});

module.exports = command;
```

## Message Formatting

### create a message

```js
const message = res.createMessage('This is a message!');
```

### add an attachment (image, etc) to message
```js
const image = message.addImage({
      title: 'sample image',
      text: 'this is the sample image',
      image_url: 'https://c1.staticflickr.com/6/5601/15459954198_25943c4242_z.jpg',
      thumb_url: 'https://c1.staticflickr.com/7/6159/6207023756_bbca3b9025_m.jpg',
});

const attachment = message.addAttachment('this is an attachment');
// or 
const otherAttachment = message.addAttachment({
  title: "Synopsis",
  text: "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy..."
  // other options ...
});

```

### add a button to attachment
```js
// for interactive components (buttons, menus), 
// you should set the action handler to the attachment first.
attachment.setAction(action);
const button = attachment.addButton({name: 'test-button', text: 'Button #1', value: 'button1'});
```

### add a menu to attachment
```js
// for interactive components (buttons, menus), 
// you should set the action handler to the attachment first.
attachment.setAction(action);
const menu = attachment.addMenu({
  name: 'test-menu', 
  text: 'which to select', 
  options: [{
    text: 'option #1',
    value: 'option1'
  }, {
    text: 'option #2',
    value: 'option2'
  }]
});
```
### hacking
for all the entities (message,attachment, button, menu, image, etc), there is a method named: `assignIn`.
You can use it to set the properties that the framework currently not exposing the api. 
```js
// set the style of the button
button.assignIn({style: 'danger'});
```

## Example


## Template
