export type TodoState = {
    id: string;
    title: string;
    time: Date;
};

export type TodoAction = {
    type: string;
    id: string;
    title: string;
    time: Date;
};

export type StackParamList = {
    Main: undefined;
    Settings: undefined;
};
