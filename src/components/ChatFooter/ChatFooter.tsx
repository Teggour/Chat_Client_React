import { FC, useRef, useState, RefObject } from "react";
import { Flex, Button, Textarea, Box } from "@chakra-ui/react";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import data from "@emoji-mart/data/sets/14/google.json";
import EmojiPicker from "@emoji-mart/react";
import { useOnClickOutside } from "usehooks-ts";

interface IProps {
	inputRef: RefObject<HTMLTextAreaElement>;
	handleSendMessage: () => void;
}

const ChatFooter: FC<IProps> = ({ inputRef, handleSendMessage }) => {
	const emojisRef = useRef<HTMLDivElement>(null);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [unified, setUnified] = useState<string>("1f642");

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onEmojiSelect = (emojiData: any) => {
		const inputValue = inputRef.current?.value;

		const selectionStart =
			inputRef.current?.selectionStart || inputValue?.length;
		const selectionEnd =
			inputRef.current?.selectionEnd || inputValue?.length;

		if (inputRef.current)
			inputRef.current.value =
				inputValue?.substring(0, selectionStart) +
				emojiData.native +
				inputValue?.substring(selectionEnd as number);
	};

	const onModalOpen = () => {
		setUnified("1f600");
		setIsModalOpen(true);
	};

	const onModalClose = () => {
		setUnified("1f642");
		setIsModalOpen(false);
	};

	useOnClickOutside(emojisRef, onModalClose);

	return (
		<Flex w="100%" align={"center"} gap={4}>
			<Textarea
				fontFamily={"Segoe UI Emoji"}
				placeholder="Type Something..."
				border="1px solid gray"
				_hover={{
					border: "1px solid blue",
				}}
				_focus={{
					border: "1px solid blue",
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSendMessage();
					}
				}}
				ref={inputRef}
			/>

			<Box ref={emojisRef} pos={"relative"}>
				<Box
					bottom={"60px"}
					right={-14}
					pos={"absolute"}
					display={isModalOpen ? "block" : "none"}
				>
					<EmojiPicker
						data={data}
						onEmojiSelect={onEmojiSelect}
						emojiButtonSize={44}
						emojiSize={40}
						perLine={6}
						exceptEmojis={[]} // TODO: add IDs
						set={"google"}
						categories={["people", "activity"]}
						navPosition={"bottom"}
						maxFrequentRows={0}
						previewPosition={"none"}
						skinTonePosition={"none"}
						searchPosition={"none"}
					/>
				</Box>

				<Box
					w={"40px"}
					cursor={"pointer"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					onClick={isModalOpen ? onModalClose : onModalOpen}
				>
					<Emoji
						unified={unified}
						size={36}
						emojiStyle={EmojiStyle.GOOGLE}
					/>
				</Box>
			</Box>

			<Button
				px={6}
				bg="blue.500"
				color="white"
				border={"1px solid"}
				borderColor={"blue.200"}
				borderRadius={20}
				_hover={{
					bg: "blue.400",
				}}
				disabled={(inputRef.current?.value || "").trim().length <= 0}
				onClick={handleSendMessage}
			>
				Send
			</Button>
		</Flex>
	);
};

export { ChatFooter };
