import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react()],
		server: {
			host: "localhost",
			port: parseInt(env.VITE_PORT),
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src/"),
				components: `${path.resolve(__dirname, "./src/components/")}`,
				pages: path.resolve(__dirname, "./src/pages"),
			},
		},
	};
});
