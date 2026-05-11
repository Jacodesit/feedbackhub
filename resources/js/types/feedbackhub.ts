export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type PageProps = {
    categories: Category[]
    feedbacks: Feedback[]
    auth: {
        user: User | null;
    };
}

export type Feedback = {
    id: number;
    public_id: string;
    comments_count: number;
    title: string,
    description: string,
    category: string;
    user: Pick<User, 'id' | 'name'>;
    votes: number;
    status: 'open' | 'in_progress' | 'completed';
    created_at: string;
}

export type Category = 'feature_request' | 'bug_report' | 'ui_ux' | 'performance' | 'other'
