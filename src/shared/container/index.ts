import { container } from 'tsyringe';

import { CitiesRepository } from '../../modules/cities/infra/typeorm/repositories/CitiesRepository';
import { ICitiesRepository } from '../../modules/cities/repositories/ICitiesRepository';
import { ClientsRepository } from '../../modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IClientsRepository } from '../../modules/clients/repositories/IClientsRepository';

container.registerSingleton<ICitiesRepository>(
  'CITIES_REPOSITORY',
  CitiesRepository,
);

container.registerSingleton<IClientsRepository>(
  'CLIENTS_REPOSITORY',
  ClientsRepository,
);
