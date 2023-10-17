import { FC, ReactNode } from "react";
import { Container, ContainerProps } from "@chakra-ui/react";

interface IProps extends ContainerProps {
	children: ReactNode;
}

const MainContainer: FC<IProps> = ({ children, ...containerProps }) => {
	return (
		<Container {...containerProps} maxW="6xl">
			{children}
		</Container>
	);
};

export { MainContainer };
