import clientController from '../controllers/clientController.js';

export const setupRoutes = (app) => {
    app.use('/client', clientController);

}