// This file now initializes the Supabase client, not S3.
import { createClient } from '@supabase/supabase-js';
import { ENV_variables } from './constants';

export const supabase = createClient(
  ENV_variables.SUPABASE_URL,
  ENV_variables.SUPABASE_SERVICE_KEY
);
