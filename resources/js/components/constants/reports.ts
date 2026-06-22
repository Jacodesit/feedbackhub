export const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        className: 'border bg-amber-100 text-amber-700 border-amber-300',
        borderClass: 'before:bg-amber-500'
    },
    reviewed: {
        label: 'Reviewed',
        className: 'border bg-blue-100 text-blue-700 border-blue-300',
        borderClass: 'before:bg-blue-500'
    },
    resolved: {
        label: 'Resolved',
        className: 'border bg-green-100 text-green-700 border-green-300',
        borderClass: 'before:bg-green-500'
    },
    dismissed: {
        label: 'Dismissed',
        className: 'border bg-slate-100 text-slate-600 border-slate-300',
        borderClass: 'before:bg-slate-400'
    },
} as const;

export const REASON_CONFIG = {
    spam: {
        label: 'Spam',
        className: 'bg-amber-100 border border-amber-300 text-amber-800',
    },
    duplicate_feedback: {
        label: 'Duplicate Feedback',
        className: 'bg-blue-100 border border-blue-300 text-blue-800',
    },
    offensive_content: {
        label: 'Offensive Content',
        className: 'bg-orange-100 border border-orange-300 text-orange-800',
    },
    harassment: {
        label: 'Harassment',
        className: 'bg-red-100 border border-red-300 text-red-800',
    },
    misleading_information: {
        label: 'Misleading Information',
        className: 'bg-purple-100 border border-purple-300 text-purple-800',
    },
    spam_or_promotional_activity: {
        label: 'Spam or Promotional Activity',
        className: 'bg-amber-100 border border-amber-300 text-amber-800',
    },
    harassment_or_bullying: {
        label: 'Harassment or Bullying',
        className: 'bg-red-100 border border-red-300 text-red-800',
    },
    hate_speech_or_offensive_behavior: {
        label: 'Hate Speech or Offensive Behavior',
        className: 'bg-orange-100 border border-orange-300 text-orange-800',
    },
    impersonation: {
        label: 'Impersonation',
        className: 'bg-blue-100 border border-blue-300 text-blue-800',
    },
    misleading_or_fraudulent_activity: {
        label: 'Misleading or Fraudulent Activity',
        className: 'bg-purple-100 border border-purple-300 text-purple-800',
    },
    repeated_community_guidelines_violations: {
        label: 'Repeated Community Guidelines Violations',
        className: 'bg-rose-100 border border-rose-300 text-rose-800',
    },
    other: {
        label: 'Other',
        className: 'bg-slate-100 border border-slate-300 text-slate-700',
    },
} as const;

export type FeedbackStatus = keyof typeof STATUS_CONFIG;
export type FeedbackCategory = keyof typeof REASON_CONFIG;
