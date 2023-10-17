import { FC, useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth";
import { IMessageData } from "@/pages/ChatPage/ChatPage";

interface IProps {
	messages: IMessageData[];
}

const ChatMessages: FC<IProps> = ({ messages }) => {
	const bttomElement = useRef<HTMLDivElement>(null);

	const userMainInfo = useAuthStore((store) => store.userMainInfo);

	useEffect(() => {
		bttomElement.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
			{messages.map((message) => {
				const isMe = message.author.id === userMainInfo?.sub;

				return (
					<Flex
						key={message.id}
						w="100%"
						gap={2}
						justify={isMe ? "flex-end" : "flex-start"}
					>
						{!isMe && (
							<Avatar
								name={message.author.name}
								src={message.author.picture}
								bg="blue.300"
								mt={4}
							/>
						)}

						<Flex
							direction={"column"}
							bg={isMe ? "gray.600" : "gray.200"}
							color={isMe ? "white" : "black"}
							minW="100px"
							maxW="350px"
							my="1"
							p="3"
							rounded={12}
						>
							{!isMe && (
								<Text
									color={"blue.600"}
									cursor={"default"}
									fontWeight={"bold"}
								>
									{message.author.name}:
								</Text>
							)}

							<Text fontSize={18}>{message.text}</Text>
						</Flex>
					</Flex>
				);
			})}

			<div ref={bttomElement} />
		</Flex>
	);
};

export { ChatMessages };
