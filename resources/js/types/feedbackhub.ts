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
    feedbacks: PaginatedFeedbacks
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

export type PaginatedFeedbacks = {
    data: Feedback[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export type Category = 'feature_request' | 'bug_report' | 'ui_ux' | 'performance' | 'other'
