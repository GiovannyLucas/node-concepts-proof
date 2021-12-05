import { Router } from 'express';

import { CreateCityController } from '../../../../modules/cities/useCases/createCity/CreateCity.controller';

const citiesRouter = Router();

citiesRouter.post('/', CreateCityController.handle);

export { citiesRouter };
