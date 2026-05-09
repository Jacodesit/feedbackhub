export const STATUS_CONFIG = {
    open: {
        label: 'Open',
        className: 'bg-amber-100 text-amber-700 border-amber-300',
    },
    in_progress: {
        label: 'In Progress',
        className: 'bg-blue-100 text-blue-700 border-blue-300',
    },
    completed: {
        label: 'Completed',
        className: 'bg-green-100 text-green-700 border-green-300',
    },
} as const;

export const CATEGORY_CONFIG = {
    feature_request: {
        label: 'Feature Request',
        className: 'bg-purple-100 text-purple-700',
    },
    bug_report: {
        label: 'Bug Report',
        className: 'bg-red-100 text-red-700',
    },
    ui_ux: {
        label: 'UI/UX',
        className: 'bg-indigo-100 text-indigo-700',
    },
    performance: {
        label: 'Performance',
        className: 'bg-orange-100 text-orange-700',
    },
    other: {
        label: 'Other',
        className: 'bg-gray-100 text-gray-700',
    },
} as const;

export type FeedbackStatus = keyof typeof STATUS_CONFIG;
export type FeedbackCategory = keyof typeof CATEGORY_CONFIG;
