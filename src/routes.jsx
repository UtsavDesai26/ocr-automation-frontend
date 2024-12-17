import React, { lazy } from "react";

const NotFound = lazy(() => import("@pages/NotFound/NotFound"));
const AddSchema = lazy(() => import("@pages/AddSchema/AddSchema"));
const ViewSchema = lazy(() => import("@pages/ViewSchema/ViewSchema"));
const ViewParticularSchema = lazy(() =>
  import("@pages/ViewParticularSchema/ViewParticularSchema")
);
const ViewSchemaData = lazy(() =>
  import("@pages/ViewSchemaData/ViewSchemaData")
);
const Users = lazy(() => import("@pages/Users/Users"));

export const ProtectedRoutes = [
  {
    path: "/",
    element: <AddSchema />,
  },
  {
    path: "/addschema",
    element: <AddSchema />,
  },
  {
    path: "/viewschemas",
    element: <ViewSchema />,
  },
  {
    path: "/viewschema/:schemaName",
    element: <ViewParticularSchema />,
  },
  {
    path: "/viewschema/:schemaName/data",
    element: <ViewSchemaData />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];

export const PublicRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
];
