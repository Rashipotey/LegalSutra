export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
  export function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }
  
  export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15)
  }
  
  