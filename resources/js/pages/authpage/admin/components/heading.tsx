export default function AdminHeading() {
    const currPath = window.location.pathname

    const headings: { [key: string]: string } = {
        '/dashboard': 'Dashboard',
        '/feedbacks': 'Feedbacks',
        '/users': 'Users',
        '/reports': 'Reports',
        '/settings': 'Settings',
    }

    return (
        <h1 className="font-medium text-xl">{headings[currPath] || 'Dashboard'}</h1>
    )
}
