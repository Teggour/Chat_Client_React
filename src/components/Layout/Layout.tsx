import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { MainContainer } from "components/MainContainer/MainContainer";

const Layout: FC = () => {
	return (
		<Flex minH={"100vh"} direction={"column"} bg={"gray.50"}>
			<MainContainer h={"full"} mb={"auto"}>
				<Outlet />
			</MainContainer>
		</Flex>
	);
};

export { Layout };
