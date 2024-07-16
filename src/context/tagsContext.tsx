import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type State = {
    activeTag: string;
};

type Action = { type: 'SET_ACTIVE_TAG'; payload: string };

const initialState: State = {
    activeTag: localStorage.getItem('activeTag') || 'All'
};

const TagsContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

const tagsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_ACTIVE_TAG':
            localStorage.setItem('activeTag', action.payload);
            return { ...state, activeTag: action.payload };
        default:
            return state;
    }
};

type TypeContextProviderProps = {
    children: ReactNode;
};

export const TagsProvider = ({ children }: TypeContextProviderProps) => {
    const [state, dispatch] = useReducer(tagsReducer, initialState);

    return (
        <TagsContext.Provider value={{ state, dispatch }}>
            {children}
        </TagsContext.Provider>
    );
};

export const useTags = () => {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error('useTags must be used within a TagsProvider');
    }
    return context;
};
