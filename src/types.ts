import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema';

export type Database = NodePgDatabase<typeof schema>;
export type DatabaseTransaction = Parameters<
  Parameters<Database['transaction']>[0]
>[0];
