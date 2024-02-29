import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {
    SOCKET_IO_CONNECTION: "http://localhost:3000/",
  };

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
