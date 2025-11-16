import { supabase } from "./supabase";

export async function loginAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const providedName = name && name.trim().length > 0 ? name.trim() : null;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: providedName,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}