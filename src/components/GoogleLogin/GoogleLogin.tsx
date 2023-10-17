/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import { GoogleLogin as GoogleLoginBtn } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { IUserMainInfo, useAuthStore } from "@/store/auth";

interface IUserObj extends IUserMainInfo {
	[key: string]: unknown;
}

const GoogleLogin: FC = () => {
	const setToken = useAuthStore((store) => store.setToken);
	const setIsAuth = useAuthStore((store) => store.setIsAuth);
	const setUserMainInfo = useAuthStore((store) => store.setUserMainInfo);

	const toast = useToast();

	return (
		<GoogleLoginBtn
			size="medium"
			text="signin"
			locale="EN"
			width={"150px"}
			onSuccess={({ credential }) => {
				const userInfo = jwtDecode(String(credential)) as IUserObj;

				const { aud, azp, exp, iat, iss, jti, nbf, ...userData } =
					userInfo;

				setIsAuth(true);
				setToken(String(credential));
				setUserMainInfo(userData as IUserMainInfo);

				toast({
					position: "top-right",
					title: `Hello, ${userData.name}!`,
					status: "success",
					isClosable: true,
					containerStyle: { mt: 8 },
				});
			}}
			onError={() => {
				console.error("Login Failed");
			}}
		/>
	);
};

export { GoogleLogin };
