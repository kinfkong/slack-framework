const slack = require('node-slack');
const commands = slack.commands;

const command = commands.addCommand({
  name: '/hello',
  handler: (req, res) => {
    const message = res.createMessage('Hello World!');
    message.addImage({
      title: 'sample image',
      text: 'this is the sample image',
      image_url: 'https://c1.staticflickr.com/6/5601/15459954198_25943c4242_z.jpg',
      thumb_url: 'https://c1.staticflickr.com/7/6159/6207023756_bbca3b9025_m.jpg'
    });
    res.send(message);
  }
});


module.exports = command;