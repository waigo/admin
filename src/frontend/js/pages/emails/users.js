var React = require('react');

var Button = require('../../components/button');
var ModelTable = require('../../components/modelTable');


module.exports = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    addUser: React.PropTypes.func,
    removeUser: React.PropTypes.func,
    clearUsers: React.PropTypes.func,
  },

  contextTypes: {
    router: React.PropTypes.object,
  },

  onRowClick: function(user) {
    this.props.addUser(user);
  },

  render: function() { 
    var self = this;

    var columns = [
      {
        name: 'username'      
      }
    ];

    var users = (<em>None selected</em>);

    const numUsers = this.props.users.length;

    if (numUsers) {
      users = this.props.users.map(function(user){
        return (
          <li className="collection-item">
            {user.username}
            <a href="#!" className="secondary-content" 
                data-id={user.id} onClick={self._onRemoveUser}>
              <i className="fa fa-remove"></i>
            </a>
          </li>
        );
      });

      users = (
        <div>
          <Button label="Clear all" size="small" onClick={this.props.clearUsers} />
          <ul className="collection">{users}</ul>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <h2>
            Select Users
          </h2>
          <div className="col s12 m5">
            <ModelTable
              modelName="User"
              columns={columns}
              excludeRows={this.props.users}
              onRowClick={this.onRowClick} />
          </div>
          <div className="col s12 m6 offset-m1 selected-users">
            <h2>Selected users:</h2>
            {users}
          </div>   
        </div>
        <div className="row email-button">
          <Button label={`Email ${numUsers} ${1 === numUsers ? 'user' : 'users'}`} 
            onClick={this._showSendStep} disabled={!numUsers} />
        </div>
      </div>
    );
  },


  _showSendStep: function(e) {
    e.preventDefault();

    this.context.router.push({
      pathname: `/send`,
    });
  },

  _onRemoveUser: function(e) {
    e.preventDefault();

    this.props.removeUser(e.currentTarget.dataset.id);
  },


});
