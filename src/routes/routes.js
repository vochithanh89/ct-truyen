import Home from '../pages/Home';
import Search from '../pages/Search';
import Details from '../pages/Details';
import Reading from '../pages/Reading';
import History from '../pages/History';
import NotFound from '../pages/NotFound';
import Library from '../pages/Library';

export const publicRoutes = [
    {
        path: '*',
        page: NotFound,
    },
    {
        path: '/',
        page: Home,
    },
    {
        path: '/search',
        page: Search,
    },
    {
        path: '/details/:id',
        page: Details,
    },
    {
        path: '/reading/*',
        page: Reading,
    },
    {
        path: '/history',
        page: History,
    },
    {
        path: '/library',
        page: Library,
    },
];

export const privateRoutes = [
    {
        path: '/profile',
    },
];
