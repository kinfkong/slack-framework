const slack = require('../slack-framework');

const commands = slack.commands;

const command = commands.addCommand({
  name: '/hello',
  handler: (req, res) => {
    console.log(req);
    const message = res.createMessage(`Hello World! Are you admin? ${req.userInfo.is_admin ? 'Yes' : 'No'}`);
    message.addImage({
      title: 'sample image',
      text: 'this is the sample image',
      image_url: 'https://c1.staticflickr.com/6/5601/15459954198_25943c4242_z.jpg',
      thumb_url: 'https://c1.staticflickr.com/7/6159/6207023756_bbca3b9025_m.jpg',
    });
    res.send(message);
  },
  scopes: ['users:read'],
});


module.exports = command;
