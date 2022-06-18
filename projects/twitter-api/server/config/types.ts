export type Configuration = {
  port: number;
  database: DatabaseConfig;
  pagination: PaginationConfig;
  sort: SortConfig;
  populate: PopulationConfig;
  token: TokenConfig;
};

interface DatabaseConfig {
  protocol: string;
  url: string;
  username?: string;
  password?: string;
}

interface PaginationConfig {
  limit: number;
  skip: number;
}

export enum DirectionFields {
  DESC = 'desc',
  ASC = 'asc',
}

export enum SortByFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

interface SortConfig {
  sortBy: {
    default: SortByFields.CREATED_AT;
    fields: SortByFields[];
  };
  direction: {
    default: DirectionFields.DESC;
    options: DirectionFields[];
  };
}

interface PopulationConfig {
  virtuals: {
    limit: number;
    sort: SortByFields.CREATED_AT;
    direction: DirectionFields.DESC;
  };
}

interface TokenConfig {
  secret: string;
  expires: string;
}
