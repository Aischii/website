import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className="sidebar-nav">
            <nav className="main-nav">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About / Contact</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/games">Games</Link></li>
                    <li><Link href="/music">Music</Link></li>
                    <li><Link href="/website">Website</Link></li>
                    <li><Link href="/links">Links</Link></li>
                    <li><Link href="/guestbook">Guestbook</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
