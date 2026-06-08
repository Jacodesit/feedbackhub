export default function AdminHeading() {
    const currPath = window.location.pathname

    const headings: { [key: string]: string } = {
        '/admin/dashboard': 'Dashboard',
        '/admin/feedbacks': 'Feedbacks',
        '/admin/users': 'Users',
        '/admin/reports': 'Reports',
        '/admin/settings': 'Settings',
        '/admin/users/{user}/feedbacks': 'User Activity'
    }

    const heading = Object.entries(headings).find(([path]) => {
        if (path.includes('{user}')) {
            const regex = new RegExp(`^${path.replace('{user}', '[^/]+')}$`)
            return regex.test(currPath)
        }

        return path === currPath
    })?.[1]

    return (
        <h1 className="font-medium text-xl">{heading || 'Dashboard'}</h1>
    )
}
