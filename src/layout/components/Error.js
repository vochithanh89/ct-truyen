import { Link } from 'react-router-dom';
import img404 from '../../assets/image/404.png';

function Error() {
    return (
        <div className="flex-1 flex flex-col items-center">
            <img className="w-[30rem] m-auto" src={img404} alt="not found 404" />
            <p to="/" className="text-text-1 text-xl">
                Có gì đó sai sai...
            </p>
            <Link to="/" className="text-text-0 text-xl hover:text-primary transition">
                Trở về trang chủ
            </Link>
        </div>
    );
}

export default Error;
