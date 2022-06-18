import 'dotenv/config';

import type { Configuration } from './types';
import { DirectionFields, SortByFields } from './types';

const configuration: Configuration = {
  port: Number(process.env.PORT),
  database: {
    protocol: String(process.env.DB_PROTOCOL),
    url: String(process.env.DB_URL),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pagination: {
    limit: 5,
    skip: 0,
  },
  sort: {
    sortBy: {
      default: SortByFields.CREATED_AT,
      fields: [SortByFields.CREATED_AT, SortByFields.UPDATED_AT],
    },
    direction: {
      default: DirectionFields.DESC,
      options: [DirectionFields.ASC, DirectionFields.DESC],
    },
  },
  populate: {
    virtuals: {
      limit: 10,
      sort: SortByFields.CREATED_AT,
      direction: DirectionFields.DESC,
    },
  },
  token: {
    secret: String(process.env.TOKEN_SECRET),
    expires: String(process.env.TOKEN_EXPIRES),
  },
};

export default configuration;
