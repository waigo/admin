import { IndexRoute, Route, Router, hashHistory } from 'react-router';

var React = require('react');
const ReactDOM = require('react-dom');

var SelectUsers = require('./users');
var SendMail = require('./send');


exports.init = function(rootElem) {

  const App = React.createClass({
    getInitialState: function() {
      return {
        users: [],
      };
    },

    addUser: function(user) {
      var existing = _.find(this.state.users, function(u) {
        return u.id === user.id;
      });

      if (!existing) {
        this.setState({
          users: this.state.users.concat([user])
        });
      }
    },

    removeUser: function(userOrId) {
      if (userOrId.id) {
        userOrId = userOrId.id;
      }

      var newUsers = this.state.users.filter(function(u) {
        return u.id !== userOrId;
      });

      this.setState({
        users: newUsers
      });
    },

    clearUsers: function() {
      this.setState({
        users: []
      });
    },

    render: function() {
      let children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          users: this.state.users,
          addUser: this.addUser,
          removeUser: this.removeUser,
          clearUsers: this.clearUsers,
        });
      });

      return (
        <div className="page-emails">
          {children}
        </div>
      );
    }
  });

  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SelectUsers} />
        <Route path="/send" component={SendMail} />
      </Route>
    </Router>
  ), rootElem);

};
