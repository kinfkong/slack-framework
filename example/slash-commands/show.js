/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is showing the demo for showing the button, menu, image, user role, etc.
 *
 * @author TCSCODER
 * @version 1.0
 */

const slack = require('../slack-framework');

const commands = slack.commands;
const actions = slack.actions;

// defines an action handler
const buttonAction = actions.addAction({
  // the name of action handler, should be globally unique
  name: 'show-button-handler',

  // the action handler, similar to the command handler
  handler: (req, res) => {
    let message = null;
    if (req.target.value === 'button1') {
      message = res.createMessage('Happy to hear that you like it.');
    } else {
      message = res.createMessage('Sorry to hear that.');
    }
    res.send(message);
  },
});

const buttonHandler = (req, res) => {
  const message = res.createMessage(`Hello ${req.user_name}!`);
  const attachment = message.addAttachment('Do you like this command? ');

  // sets the action handler for the attachment
  attachment.setAction(buttonAction);

  // create the buttons
  attachment.addButton({text: 'I like it!', value: 'button1', name: 'button'});
  const btn2 = attachment.addButton({text: 'I don\'t like it!', value: 'button2', name: 'button'});

  // you can set other options if needed
  btn2.assignIn({style: 'danger'});

  res.send(message);
};

const menuAction = actions.addAction({
  name: 'show-menu-handler',
  handler: (req, res) => {
    const target = req.target;
    const message = res.createMessage();
    const targetValue = target.selected_options[0].value;
    if (targetValue === 'option1') {
      message.addText('Thanks for loving the /hello command');
    } else if (targetValue === 'option2') {
      message.addText('Thanks for loving the /hello-with-button command');
    } else {
      message.addText('Thanks for loving the /show command');
    }
    res.send(message);
  },
});

const menuHandler = (req, res) => {
  const message = res.createMessage('Which command do you like best?');
  const attachment = message.addAttachment();

  attachment.setAction(menuAction);

  const selectOptions = [
    {text: '/hello', value: 'option1'},
    {text: '/hello-with-button', value: 'option2'},
    {text: '/show', value: 'option3'},
  ];

  attachment.addMenu({name: 'command-select-menu', text: 'Please select one:', options: selectOptions});

  res.send(message);
};

const imageHandler = (req, res) => {
  const message = res.createMessage(`This is the image I like best!`);
  message.addImage({
    title: 'Nice image!',
    text: 'Stars in the sky',
    image_url: 'https://c1.staticflickr.com/6/5601/15459954198_25943c4242_z.jpg',
    thumb_url: 'https://c1.staticflickr.com/7/6159/6207023756_bbca3b9025_m.jpg',
  });
  res.send(message);
};

const roleHandler = (req, res) => {
  const message = res.createMessage(`Here is role information for ${req.user_name}: `);
  message.addAttachment({
    fields: [{
      title: 'ADMIN',
      value: req.userInfo.is_admin ? 'Yes' : 'No',
    }, {
      title: 'OWNER',
      value: req.userInfo.is_owner ? 'Yes' : 'No',
    }, {
      title: 'APP USER',
      value: req.userInfo.is_app_user ? 'Yes' : 'No',
    }],
  });
  res.send(message);
};

const command = commands.addCommand({
  // the name of the command
  name: '/show',

  // the slash command handler
  handler: (req, res) => {
    if (req.text === 'button') {
      buttonHandler(req, res);
    } else if (req.text === 'menu') {
      menuHandler(req, res);
    } else if (req.text === 'image') {
      imageHandler(req, res);
    } else if (req.text === 'role') {
      roleHandler(req, res);
    }
  },

  scopes: ['users:read'],

  helpHandler: (req, res) => {
    const message = res.createMessage();
    const attachment = message.addAttachment('This is the options for /show command');
    attachment.assignIn({fields: [
      {
        title: '/show button',
        value: 'shows the button',
      },
      {
        title: '/show menu',
        value: 'shows the menu',
      },
      {
        title: '/show image',
        value: 'shows the image',
      },
      {
        title: '/show role',
        value: 'shows the role',
      },
    ]});

    res.send(message);
  },
});


module.exports = command;
