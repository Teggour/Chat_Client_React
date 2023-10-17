import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "components/Router/Router";

const App: FC = () => {
	return (
		<BrowserRouter>
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
			>
				<ChakraProvider>
					<Router />
				</ChakraProvider>
			</GoogleOAuthProvider>
		</BrowserRouter>
	);
};

export { App };
