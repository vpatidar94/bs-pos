import App from './app';
import IndexApi from './@app/api/index.api';
import VehicleApi from './@app/api/vehicle.api';
import TxApi from './@app/api/tx.api';
// import IndexRoute from './routes/index.route';
// import UsersRoute from './routes/users.route';
// import AuthRoute from './routes/auth.route';
// import validateEnv from './utils/validateEnv';

// validateEnv();

const app = new App([
    new IndexApi(),
    new VehicleApi(),
    new TxApi()
    // new UsersRoute(),
    // new AuthRoute(),
]);

app.listen();
