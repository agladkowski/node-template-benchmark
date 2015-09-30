var express = require('express');
var router = express.Router();
var Hogan = require('hjs');
var fs = require('fs');
var template = Hogan.compile(fs.readFileSync('views/hogan/hogan.hjs', "utf8"));

function prepareMessages(req) {
  var messageCount = req.query.messageCount ? req.query.messageCount : 100;
  var messages = [];
  for (var i = 0; i < messageCount; i++) {
    messages.push({"message": i});
  }
  return messages;
}

function renderMessages(messages) {
  return template.render({messages: messages});
}

/* GET hogan listing. */
router.get('/', function(req, res, next) {
  var messages = prepareMessages(req);

  // timing template rendering
  var startTime = new Date().getTime();
  renderMessages(messages);
  var endTime = (new Date().getTime() - startTime);

  res.render('hogan/results', { numberOfMessages: messages.length, renderingTime: endTime + "milliseconds"});
});

router.get('/template', function(req, res, next) {
  var messages = prepareMessages(req);
  res.send(renderMessages(messages));
});

module.exports = router;
