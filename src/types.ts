export interface User {
    id: string;
    name: string;
    imageUrl: string;
}

export type Like = {
    blogId: string;
    userId: string;
};

export interface BlogPost {
    id: string;
    imageUrl: string;
    tag: string;
    title: string;
    content: string;
    createdAt: string;
    liked: Like[];
    user: User;
}

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};
