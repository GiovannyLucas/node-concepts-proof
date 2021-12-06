import { Router } from 'express';

import { CreateClientController } from '../../../../modules/clients/useCases/createClient/CreateClient.controller';

const clientsRouter = Router();

clientsRouter.post('/', CreateClientController.handle);

export { clientsRouter };
