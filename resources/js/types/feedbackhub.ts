export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    public_id: string;
    email_verified_at: string | null;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export type AdminUser = Pick<
    User,
    'id' | 'name' | 'email' | 'public_id' | 'avatar' | 'created_at'
    > & {
    is_admin: boolean;
    feedbacks_count: number;
    completed_feedbacks_count: number;
    comments_count: number;
    comments_received_count: number;
    total_votes_received: number | null;
    feedbacks: AdminRecentFeedback[];

};

export type AdminRecentFeedback = {
    id: number;
    user_id: number;
    title: string;
    description: string;
    category: Category;
    status: 'open' | 'in_progress' | 'completed';
    votes: number;
    comments_count: number;
    created_at: string;
};

export type PageProps = {
    categories: Category[]
    feedbacks: PaginatedFeedbacks
    csrf_token: string
    auth: {
        user: User | null;
    };
}

// Array of feedbacks
export type Feedback = {
    id: number;
    comments_count: number;
    comments: Comments[];
    feedback_votes?: FeedbackVote[];
    title: string,
    description: string,
    category: string;
    user: Pick<User, 'id' | 'name' | 'public_id' | 'avatar' | 'email'> & {
        feedbacks_count?: number;
        comments_count?: number;
        total_votes_received?: number;
        total_comments_received?: number;
    };
    votes: number;
    has_liked: boolean;
    status: 'open' | 'in_progress' | 'completed';
    is_pinned: boolean
    created_at: string;
}

export type FeedbackVote = {
    id: number;
    title: string;
    user_id: number;
    user_name: string;
    feedback_id: number;
    user: Pick<User, 'id' | 'name' | 'avatar' | 'email'>;
    created_at:string
    feedback?: {
        id: number;
        title: string;
        user_id: number;
        status: 'open' | 'in_progress' | 'completed';
        user: Pick<User, 'id' | 'name' | 'avatar' | 'email'>;

    };
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
        email: string
    }
    feedback?: {
        id: number
        title: string
    }
}

export type Category = 'feature_request' | 'bug_report' | 'ui_ux' | 'performance' | 'other'

export type UserStats = {
    feedbacks_count: number;
    total_votes_received: number;
    completed_feedbacks_count: number;
    comments_count: number;
    total_comments_received: number;
}

// Array of feedbacks with pagination
export type PaginatedFeedbacks = {
    data: Feedback[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export type PaginatedUsers = {
    data: AdminUser[];
    links: { url: string | null; label: string; active: boolean }[];
    per_page: number;
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
};

export type PaginatedComments = {
    data: Comments[]
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export type PaginatedVotes = {
    data: FeedbackVote[]
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export type PaginatedReports = {
    data: Report[]
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

export interface Report {
    id: number;
    feedback_id: number;
    reported_by: number;
    details: string | null;
    reason: ReportReason;
    status: ReportStatus;
    created_at: string;
    updated_at: string;

    reporter: {
        id: number;
        name: string;
        avatar: string | null;
        email: string;
        public_id: string
    };

    feedback: Feedback;
}

export type Stats = {
    totalFeedbacks: number;
    totalUsers: number;
    totalComments: number;
    pendingFeedbacks: number;
}

export type ReportReason =
    | 'spam'
    | 'duplicate_feedback'
    | 'offensive_content'
    | 'harassment'
    | 'misleading_information'
    | 'other';

export type ReportStatus =
    | 'pending'
    | 'reviewed'
    | 'resolved'
    | 'dismissed';

export type UserReportReason =
    | 'spam_or_promotional_activity'
    | 'harassment_or_bullying'
    | 'hate_speech_or_offensive_behavior'
    | 'impersonation'
    | 'misleading_or_fraudulent_activity'
    | 'repeated_community_guidelines_violations'
    | 'other';

export type UserReportStatus =
    | 'pending'
    | 'reviewed'
    | 'action_taken'
    | 'dismissed';

export interface SelectOption {
    value: string;
    label: string;
}


