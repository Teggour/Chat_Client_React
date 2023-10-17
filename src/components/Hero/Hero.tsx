import { FC } from "react";
import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { GoogleLogin } from "@/components/GoogleLogin/GoogleLogin";

const Hero: FC = () => {
	return (
		<Stack
			h={"100vh"}
			direction={{ base: "column", md: "row" }}
			align={"center"}
		>
			<Flex p={8} flex={1}>
				<Stack
					spacing={6}
					w={"full"}
					maxW={"lg"}
					align={"center"}
					justify={"center"}
				>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text color={"blue.400"} as={"span"}>
							Chat App
						</Text>
					</Heading>

					<Text
						fontSize={{ base: "md", lg: "lg" }}
						color={"gray.500"}
					>
						Created with: React, Nest, Socket.io
					</Text>

					<Stack
						direction={{ base: "column", md: "row" }}
						spacing={4}
					>
						<GoogleLogin />
					</Stack>
				</Stack>
			</Flex>

			<Flex flex={1}>
				<Image
					maxH={"350px"}
					alt={"Chat image"}
					objectFit={"cover"}
					src={"/hero.jpg"}
				/>
			</Flex>
		</Stack>
	);
};

export { Hero };
