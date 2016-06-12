# waigo-plugin-admin

The *official* [waigo](http://waigojs.com) plugin which provides an 
Administration interface for your Waigo app:

* See info on cron jobs and run them whenever you want
* Test out all of your app's routes (incl. POST, PUT, etc)
* Send an email to a selection of users (raw query filtering supported)
* Browse, create and edit database data (raw query filtering supported)

All routes are placed under the `/admin` path and access is controlled via the 
Waigo ACL. By default only users with the `admin` role can access the 
routes. 

## Requirements

This plugin must be used in conjunction with Waigo 2+. It assumes you're using 
Waigo's built-in model layer, including the built-in `User` model. 

## Installation

```bash
$ npm install waigo-admin
```

## Usage instructions

Set what links will show in the admin dashboard nav menu by entering the following in your `config/base.js`:

```js
// admin menu
config.adminMenu = [
  {
    label: 'Dashboard',
    path: '/admin',
  },
  {
    label: 'Routes',
    path: '/admin/routes',
    canAccess: 'admin',
  },
  {
    label: 'Data',
    path: '/admin/models',
    canAccess: 'admin',
  },
  {
    label: 'Send email',
    path: '/admin/emails',
    canAccess: 'admin',
  },
  {
    label: 'Cron tasks',
    path: '/admin/cron',
    canAccess: 'admin',
  },
];
```

_Note: the `canAccess` key specifies the the name of the resources which the 
user must be able to access (according to the ACL) in order to be access the 
given page. If not provided then anyone would be able to access the given page._

Ensure you have alteast one user with the `admin` role assigned and that the 
ACL contains an entry allowing `admin` role access to the `admin` resource.

Start Waigo and browse to `/admin`.

Login as the admin user and start using the interface.

### Customization

The data admin page will by default show all table columns for each model. To 
modify this behaviour provide an `adminViewOptions` key within your model 
schemas. For example:

```js
// File: src/models.activity.js


const UserSchema = {
  id: {    
    type: String,
    required: false,
  },
  displayName: {
    type: String,
    required: true,
  },
};

exports.schema = {
  verb: { 
    type: String, 
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
  actor: {
    type: [UserSchema],
    required: true,
    adminViewOptions: {
      viewSubKey: "displayName" /* when showing this column just show the value of the UserSchema.displayName key */
    }
  },
  details: {
    type: Object,
    adminViewOptions: {
      hide: true, /* don't show this column */
    },
  },
};
```


## License

MIT - see LICENSE.md