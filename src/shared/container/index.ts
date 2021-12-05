import { container } from 'tsyringe';

import { CitiesRepository } from '../../modules/cities/infra/typeorm/repositories/CitiesRepository';
import { ICitiesRepository } from '../../modules/cities/repositories/ICitiesRepository';

container.registerSingleton<ICitiesRepository>(
  'CITIES_REPOSITORY',
  CitiesRepository,
);
