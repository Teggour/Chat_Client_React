import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Heading, Text, Button, Link as LinkUI } from "@chakra-ui/react";

interface IProps {}

const NotFound: FC<IProps> = () => {
	const { state } = useLocation();

	return (
		<Box textAlign="center" py={36} px={6} h={"full"}>
			<Heading
				display="inline-block"
				as="h2"
				size="2xl"
				bgGradient={"linear(to-r, gray.600, gray.700)"}
				backgroundClip="text"
			>
				404
			</Heading>

			<Text color={"gray.800"} fontSize="18px" mt={3} mb={2}>
				Page Not Found
			</Text>

			<Text color={"gray.600"} mb={6}>
				The page you&apos;re looking for{" "}
				{state?.redirectFrom ? (
					<LinkUI
						as={Link}
						to={
							state?.redirectFrom.pathname +
							state?.redirectFrom.search
						}
					>
						({state?.redirectFrom.pathname}){" "}
					</LinkUI>
				) : (
					" "
				)}
				does not seem to exist
			</Text>

			<Button
				as={Link}
				to={"/"}
				colorScheme="gray"
				bg={"gray.700"}
				_hover={{ bg: "gray.800" }}
				color={"gray.100"}
				variant="solid"
			>
				Go to Home
			</Button>
		</Box>
	);
};

export { NotFound };
