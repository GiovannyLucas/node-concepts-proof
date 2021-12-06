export class CreateClientDto {
  full_name: string;
  gender: 'M' | 'F';
  born_date: Date;
  age: number;
  city_living_id: string;
}
