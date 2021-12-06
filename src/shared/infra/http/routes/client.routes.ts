import { Router } from 'express';

import { CreateClientController } from '../../../../modules/clients/useCases/createClient/CreateClient.controller';
import { FindClientsController } from '../../../../modules/clients/useCases/findClients/FindClients.controller';

const clientsRouter = Router();

clientsRouter.post('/', CreateClientController.handle);
clientsRouter.get('/', FindClientsController.handle);

export { clientsRouter };
