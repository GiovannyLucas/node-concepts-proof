import { Router } from 'express';

import { CreateCityController } from '../../../../modules/cities/useCases/createCity/CreateCity.controller';
import { FindCitiesController } from '../../../../modules/cities/useCases/findCities/FindCities.controller';

const citiesRouter = Router();

citiesRouter.post('/', CreateCityController.handle);
citiesRouter.get('/', FindCitiesController.handle);

export { citiesRouter };
