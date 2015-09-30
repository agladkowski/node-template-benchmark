// https://github.com/yldio/react-example/blob/master/express/index.js
var express = require('express');
var router = express.Router();
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');

var app = express();

jsx.install();

var Messages = require('../views/react/Messages.jsx');

router.get('/bundle.js', function(req, res, next) {
  res.setHeader('content-type', 'application/javascript');
  var result = browserify('./appClient.js', {
    //debug: true,
  cache: true,
  precompile: true
  })
  .transform('reactify')
  .bundle().pipe(res);
});

function prepareMessages(req) {
  var messageCount = req.query.messageCount ? req.query.messageCount : 100;
  var messages = [];
  for (var i = 0; i < messageCount; i++) {
    messages.push({"message": i});
  }
  return messages;
}

function renderMessages(messages) {
  return React.renderToStaticMarkup(
      React.DOM.body(
          null,
          React.DOM.div({
              id: 'container',
              dangerouslySetInnerHTML: {
                  __html: React.renderToString(React.createElement(Messages, {
                      messages: messages
                  }))
              }
          }),
          React.DOM.script({
              'id': 'initial-data',
              'type': 'text/plain',
              'data-json': JSON.stringify(messages)
          }),
          React.DOM.script({
              src: '/react/bundle.js'
          })
      )
  );
}

/* GET hogan listing. */
router.get('/', function(req, res, next) {
  var messages = prepareMessages(req);

  // timing template rendering
  var startTime = new Date().getTime();
  renderMessages(messages);
  var endTime = (new Date().getTime() - startTime);

  res.render('react/results', { numberOfMessages: messages.length, renderingTime: endTime + "milliseconds"});
});

router.get('/template', function(req, res, next) {
  var messages = prepareMessages(req);
  res.send(renderMessages(messages));
});

module.exports = router;
