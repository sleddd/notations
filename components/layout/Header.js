'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { Clock } from '@/components/clock';
import { Calendar } from '@/components/calendar/Calendar';
import RoofingIcon from '@mui/icons-material/Roofing';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GET_USER } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export const Header = () => {
    const pathName = usePathname();
    const { data } = useQuery(GET_USER);
    const user = data?.viewer;
    const avatarUrl = user?.avatar?.url;
    return (
        <header className="header">
            <div className="topbar">
                <div className="left-menu">
                    <Link href="/"><HistoryEduIcon /></Link>
                    <Clock />
                </div>
                <div className="right-menu">
                    <LoginForm />
                    {user ? <img src={avatarUrl} alt={user?.name} className="avatar" /> : ''}
                </div>
            </div>
            {'/' == pathName && user ? <Calendar /> : ''}
        </header>
    )
};