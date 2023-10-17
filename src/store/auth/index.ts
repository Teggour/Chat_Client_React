import { create } from "zustand";
import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IUserMainInfo {
	email: string;
	email_verified: boolean;
	family_name: string;
	given_name: string;
	name: string;
	picture: string;
	sub: string;
}

interface State {
	isAuth: boolean;
	token: string | null;
	userMainInfo: IUserMainInfo | null;
}

interface Action {
	setIsAuth: (value: boolean) => void;
	setToken: (newToken: string) => void;
	setUserMainInfo: (user: IUserMainInfo) => void;
	clearState: () => void;
}

type AuthStore = State & Action;

const initialState: State = {
	isAuth: false,
	token: null,
	userMainInfo: null,
};

const store: StateCreator<AuthStore> = (set) => ({
	...initialState,
	setIsAuth: (auth) => set(() => ({ isAuth: auth })),
	setToken: (newToken) => set(() => ({ token: newToken })),
	setUserMainInfo: (user) => set(() => ({ userMainInfo: user })),
	clearState: () => set(() => initialState),
});

const useAuthStore = create<AuthStore>()(
	devtools(persist(store, { name: "chat-auth" }))
);

export { useAuthStore };
