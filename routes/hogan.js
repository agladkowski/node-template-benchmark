var express = require('express');
var router = express.Router();
var Hogan = require('hjs');
var fs = require('fs');
var MessagesTemplate = Hogan.compile(fs.readFileSync('views/hogan/messages.hjs', "utf8"));
var MessageTemplate = Hogan.compile(fs.readFileSync('views/hogan/message.hjs', "utf8"));

function prepareMessages(req) {
  var messageCount = req.query.messageCount ? req.query.messageCount : 100;
  var messages = [];
  for (var i = 0; i < messageCount; i++) {
    messages.push({"message": i});
  }
  return messages;
}

function renderMessages(messages) {
  var context = {messages: messages};
  var partials = {message: MessageTemplate};
  return MessagesTemplate.render(context, partials);
}

router.get('/template', function(req, res, next) {
    res.send(renderMessages(prepareMessages(req)));
});

router.get('/', function(req, res, next) {
  var messages = prepareMessages(req);

  // timing template rendering
  var startTime = new Date().getTime();
  renderMessages(messages);
  var endTime = (new Date().getTime() - startTime);

  res.render('hogan/results', { numberOfMessages: messages.length, renderingTime: endTime + "milliseconds"});
});

module.exports = router;
