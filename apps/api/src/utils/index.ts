import { supabase } from '../supabaseConfig';

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const deleteSupabaseObject = async (bucket: string, key: string) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([key]);
    if (error) {
      console.error('Error deleting Supabase object:', error);
      throw new Error('Failed to delete Supabase object');
    }
    return true;
  } catch (error) {
    console.error('Error deleting Supabase object:', error);
    throw new Error('Failed to delete Supabase object');
  }
};
