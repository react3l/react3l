import {Application} from './Application';
import {User} from './User';
import {Model} from '@react3l/common';

Model.hasMany<Application, User>(Application, User, 'users');
Model.belongsTo<User, Application>(User, Application, 'application');

export {
  Application,
  User,
}
