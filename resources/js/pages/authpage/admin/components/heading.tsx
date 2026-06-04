export default function AdminHeading() {
    const currPath = window.location.pathname

    const headings: { [key: string]: string } = {
        '/admin/dashboard': 'Dashboard',
        '/admin/feedbacks': 'Feedbacks',
        '/admin/users': 'Users',
        '/admin/reports': 'Reports',
        '/admin/settings': 'Settings',
    }

    return (
        <h1 className="font-medium text-xl">{headings[currPath] || 'Dashboard'}</h1>
    )
}
