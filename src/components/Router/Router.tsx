import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Layout } from "components/Layout/Layout";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import { ChatPage } from "pages/ChatPage/ChatPage";
import { WelcomePage } from "pages/WelcomePage/WelcomePage";

const Router: FC = () => {
	const isAuth = useAuthStore((store) => store.isAuth);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* Not found page */}
				<Route path="*" element={<Navigate to="/404" replace />} />
				<Route path="404" element={<NotFoundPage />} />

				{/* Home */}
				<Route
					index
					element={isAuth ? <ChatPage /> : <WelcomePage />}
				/>
				<Route path="chat" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
};

export { Router };
