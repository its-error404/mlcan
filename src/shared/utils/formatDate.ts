import { format } from "date-fns";

export const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };