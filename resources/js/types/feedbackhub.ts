export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    public_id: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type PageProps = {
    categories: Category[]
    feedbacks: PaginatedFeedbacks
    csrf_token: string
    auth: {
        user: User | null;
    };
}

export type Feedback = {
    id: number;
    comments_count: number;
    comments: Comments[];
    title: string,
    description: string,
    category: string;
    user: Pick<User, 'id' | 'name' | 'avatar'>;
    votes: number;
    has_liked: boolean;
    status: 'open' | 'in_progress' | 'completed';
    created_at: string;
}

export type PaginatedFeedbacks = {
    data: Feedback[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export type Comments = {
    id: number
    user_id: number
    feedback_id: number
    content: string
    created_at: string
    updated_at: string
    user: {
        id: number
        name: string
        avatar: string | null
    }
}

export type Category = 'feature_request' | 'bug_report' | 'ui_ux' | 'performance' | 'other'
