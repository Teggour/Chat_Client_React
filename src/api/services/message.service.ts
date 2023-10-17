import api from "../axios";
import { IMessageData } from "@/pages/ChatPage/ChatPage";

class MessageService {
	private apiUrl = "chat";

	getMessages() {
		return api.get<IMessageData[]>(`${this.apiUrl}/getMessages`);
	}
}

const messageService = new MessageService();

export { messageService };
