import { createBrowserRouter } from "react-router-dom";

import publicRoutes from "@/routes/PublicRoutes";

export const router = createBrowserRouter([...publicRoutes]);
