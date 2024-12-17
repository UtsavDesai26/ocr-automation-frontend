export const BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}`;

export const api = {
  signIn: `${BASE_API_URL}/auth/login`,
  addSchema: `${BASE_API_URL}/schema`,
  getSchemas: `${BASE_API_URL}/schema`,
  deleteSchemaByName: `${BASE_API_URL}/schema`,
  getSchemaByName: `${BASE_API_URL}/schema`,
  getSchemaDataByName: `${BASE_API_URL}/schema`,
  getUsers: `${BASE_API_URL}/users`,
};
