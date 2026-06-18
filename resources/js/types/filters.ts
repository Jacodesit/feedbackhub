export interface AdminFilters {
    search?: string;
    sort?: 'newest' | 'oldest';
    feedback_status?: 'all' | 'open' | 'in_progress' | 'completed'
    feedback_category?: 'all' | 'feature_request' | 'bug_report' | 'performance' | 'ui_ux' | 'other';
    users_role?: 'all' | 'user' | 'admin';
    report_reason?: 'all' | 'spam' | 'duplicate_feedback' | 'offensive_content' | 'harassment' | 'misleading_information' | 'other'
    report_status?: 'all' | 'pending' | 'reviewed' | 'resolved' | 'dismissed';
    tab?: string;
}
