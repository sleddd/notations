'use client';
import WorkIcon from '@mui/icons-material/Work';
import BiotechIcon from '@mui/icons-material/Biotech';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SpaIcon from '@mui/icons-material/Spa';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

export const signifiers = [
    {
        name: 'Task',
        slug: 'task',
        icon: <TaskOutlinedIcon />
    },
    {
        name: 'Work',
        slug: 'work',
        icon: <WorkIcon />
    },
    {
        name: 'Research',
        slug: 'research',
        icon: <BiotechIcon />
    },
    {
        name: 'Idea',
        slug: 'idea',
        icon: <TipsAndUpdatesIcon />
    },
    {
        name: 'Health',
        slug: 'health',
        icon: <SpaIcon />
    },
    {
        name: 'Family',
        slug: 'family',
        icon: <FamilyRestroomIcon />
    },
    {
        name: 'Finance',
        slug: 'finance',
        icon: <AttachMoneyIcon />
    },
    {
        name: 'Personal',
        slug: 'personal',
        icon: <PersonIcon />
    },
    {
        name: 'Contact',
        slug: 'contact',
        icon: <BookIcon />
    },
    {
        name: 'Other',
        slug: 'other',
        icon: <FiberManualRecordIcon />
    }
];