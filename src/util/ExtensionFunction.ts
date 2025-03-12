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
