import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://ivxrdlytwlalnxqmixcn.supabase.co";

const supabaseKey =
  "sb_publishable_3PTcx-7qPiMM1iEy34aXVQ_YMBYUNJ5";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );