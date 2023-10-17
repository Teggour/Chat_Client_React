import { FC, useEffect, useRef, useState } from "react";
import { Flex, Divider, Button } from "@chakra-ui/react";
import io from "socket.io-client";
import { ChatFooter } from "@/components/ChatFooter/ChatFooter";
import { ChatMessages } from "@/components/ChatMessages/ChatMessages";
import { IUserMainInfo, useAuthStore } from "@/store/auth";
import { messageService } from "@/api/services/message.service";

export interface IAuthor {
	id: string;
	email: string;
	picture: string;
	name: string;
	family_name: string;
	given_name: string;
}

export interface IMessageData {
	id: string;
	text: string;
	author: IAuthor;
	createdAt: string;
}

interface IMessage extends Pick<IMessageData, "text" | "author"> {}

const anonymousUser: IAuthor = {
	id: crypto.randomUUID(),
	email: "",
	picture: "",
	name: "Anonymous User",
	family_name: "User",
	given_name: "Anonymous",
};

const transformUserData = (user: IUserMainInfo): IAuthor => {
	const newUser: IAuthor = {
		id: user.sub,
		email: user.email,
		picture: user.picture,
		name: user.name,
		family_name: user.family_name,
		given_name: user.given_name,
	};

	return newUser;
};

const socket = io(import.meta.env.VITE_SOCKET_API_URL);

const ChatPage: FC = () => {
	const [messages, setMessages] = useState<IMessageData[]>([]);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	const userMainInfo = useAuthStore((store) => store.userMainInfo);
	const clearAuthState = useAuthStore((store) => store.clearState);

	const handleSendMessage = (): void => {
		if (!inputRef.current?.value.trim().length) {
			return;
		}

		const newMessage: IMessage = {
			text: inputRef.current.value,
			author: userMainInfo
				? transformUserData(userMainInfo)
				: anonymousUser,
		};

		socket.emit("sendMessage", newMessage);

		inputRef.current.value = "";
	};

	const handleLogout = () => {
		clearAuthState();
	};

	useEffect(() => {
		const getMessages = async () => {
			const { data } = await messageService.getMessages();

			setMessages(data);
		};

		socket.on("recieveMessage", (message: IMessageData) => {
			// console.log("recieveMessage");

			// TODO: check
			setMessages((prev) => Array.from(new Set([...prev, message])));
		});

		socket.on("clearMessages", (messages: IMessageData[]) => {
			setMessages(messages);
		});

		getMessages();
	}, []);

	return (
		<Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
			<Flex w={["100%", "100%", "90%"]} h={"90%"} flexDir={"column"}>
				<Flex  justify={"end"}>
					<Button
						px={6}
						bg="gray.400"
						color="black"
						border={"1px solid"}
						borderColor={"gray.600"}
						borderRadius={20}
						_hover={{
							bg: "gray.300",
							borderColor: "gray.500",
						}}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Flex>

				<Divider
					w={"100%"}
					borderBottomWidth={3}
					borderColor={"gray.800"}
					my={5}
				/>

				<ChatMessages messages={messages} />

				<Divider
					w={"100%"}
					borderBottomWidth={3}
					borderColor={"gray.800"}
					my={5}
				/>

				<ChatFooter
					inputRef={inputRef}
					handleSendMessage={handleSendMessage}
				/>
			</Flex>
		</Flex>
	);
};

export { ChatPage };
