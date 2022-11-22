import Home from '../pages/Home';
import Search from '../pages/Search';
import Details from '../pages/Details';
import Reading from '../pages/Reading';
import History from '../pages/History';
import NotFound from '../pages/NotFound';
import Library from '../pages/Library';
import MainLayout from '../layout/MainLayout';
import DetailsLayout from '../layout/DetailsLayout';
import ReadingLayout from '../layout/ReadingLayout';
import WithSlidebarLayout from '../layout/WithSlidebarLayout';

export const publicRoutes = [
    {
        path: '*',
        page: NotFound,
        layout: MainLayout,
    },

    {
        path: '/',
        page: Home,
        layout: WithSlidebarLayout,
    },
    {
        path: '/search',
        page: Search,
        layout: MainLayout,
    },
    {
        path: '/details/*',
        page: Details,
        layout: DetailsLayout,
    },
    {
        path: '/reading/*',
        page: Reading,
        layout: ReadingLayout,
    },
    {
        path: '/history',
        page: History,
        layout: MainLayout,
    },
    {
        path: '/library',
        page: Library,
        layout: MainLayout,
    },
];

export const privateRoutes = [
    {
        path: '/profile',
    },
];
