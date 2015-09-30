var React = require('react');
var Messages = require('./views/react/Messages.jsx');

var messages = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<Books messages={messages} />, document.getElementById('container'));