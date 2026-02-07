export function formatDateString(dateString: string, addYear: boolean = false): string {
  const date = new Date(dateString);
  if (addYear) {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date.toLocaleDateString('en-EN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function formatTimeDifference(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'Solicitud cerrada';
  }
  
  if (diffDays === 0) {
    return 'Hoy';
  }
  
  if (diffDays === 1) {
    return '1 día';
  }
  
  return `${diffDays} días`;
}