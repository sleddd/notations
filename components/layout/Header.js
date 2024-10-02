'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { Clock } from '@/components/clock';
import { Calendar } from '@/components/calendar/Calendar';
import RoofingIcon from '@mui/icons-material/Roofing';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
    const pathName = usePathname();
    const { data: user } = useSession();

    return (
        <header className="header">
            <div className="topbar">
                <div className="left-menu">
                    <Link href="/"><RoofingIcon /></Link>
                    <Clock />
                </div>
                <div className="right-menu">
                    <LoginForm />
                    <div className="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            {'/' == pathName && user ? <Calendar /> : ''}
        </header>
    )
};