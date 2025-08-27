import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  handleServerError: (e) => {
    console.error("Server error:", e);
    return "An error occurred while processing your request";
  },
});