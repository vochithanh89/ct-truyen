import { Link } from 'react-router-dom';
import logo from '../../../assets/image/logo.png';

function Logo() {
    return (
        <div className="h-[2.2rem] lg:h[2rem] xs:h-[1.8rem] pr-4">
            <Link className="block h-full" to="/">
                <img className="h-full" src={logo} alt="ct-truyen logo" />
            </Link>
        </div>
    );
}

export default Logo;
