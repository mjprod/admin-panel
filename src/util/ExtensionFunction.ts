import { defaultLanguage } from "../api/contants";
import { Language } from "../api/responsePayload/KnowledgeResponse";

export const utcToLocalDate = (utcDateString: string): string => {
  const date = new Date(utcDateString);
  
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear(); 

  return `${day}-${month}-${year}`;
};


export const utcToLocalTime = (utcDateString: string): string => {
  const date = new Date(utcDateString);

  let hours = date.getHours(); 
  const minutes = String(date.getMinutes()).padStart(2, "0"); 
  const seconds = String(date.getSeconds()).padStart(2, "0"); 
  const ampm = hours >= 12 ? "PM" : "AM"; 

  hours = hours % 12 || 12; 

  return `${hours}:${minutes}:${seconds} ${ampm}`;
};


export const getLanguageByCode = (code: string) => 
      Object.values(Language).find(lang => lang.code === code) || defaultLanguage;
    
export const getLanguageById = (id: number) => 
  Object.values(Language).find(lang => lang.id === id) || defaultLanguage;

    
export function hexToHsla(hex: string): string {
  // Remove the hash at the start if it's there
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  // Parse the hex code and extract the RGB values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Calculate the min and max RGB values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate Lightness
  const l = (max + min) / 2;

  // Calculate Saturation
  let s = 0;
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  }

  // Calculate Hue
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = (g - b) / delta + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h *= 60;
  }

  // Return the HSLA string
  return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`;
}

export function updateHslaValues(hsla: string, newS: number, newL: number): string {
  // Regular expression to match HSLA string and extract H, S, L, A values
  const regex = /^hsla\((\d+),\s*(\d+)%?,\s*(\d+)%?,\s*(\d(\.\d+)?)\)$/i;

  // Match the HSLA string with regex
  const match = hsla.match(regex);

  if (!match) {
    throw new Error('Invalid HSLA format');
  }

  // Extract the H, S, L, and A values from the matched HSLA string
  const h = match[1];  // Hue (unchanged)
  const s = newS;      // New Saturation
  const l = newL;      // New Lightness
  const a = 1;      // New Alpha

  // Return the updated HSLA string with modified values
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}
