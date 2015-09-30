var React = require('react');

var Messages = React.createClass({
    propTypes: {
        messages: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            messages: (this.props.messages || [])
        };
    },
    render: function() {
        var messageList = this.state.messages.map(function(message) {
            return <Message message={message.message} ></Message>;
        });

        return (
            <div>
                <table>
                    {messageList}
                </table>
            </div>
        );
    }
});

var Message = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            message: this.props.message
        };
    },
    render: function() {
        return (
            <tr>
                <td>Lorem ipsum, lorem ipsum, lorem ipsum {this.props.message}</td>
            </tr>
        );
    }
});

module.exports = Messages;