import clsx from 'clsx';
import replaceBR from '../assets/image/replaceBR.jpg';
import replacePT from '../assets/image/replacePT.jpg';

function Image({ type, src, alt, title, className }) {
    return (
        <img
            src={src}
            alt={alt}
            title={title}
            className={clsx('object-cover h-[12rem] rounded-xl transition-all duration-500', className)}
            onError={(e) => {
                e.target.src = type === 'background' ? replaceBR : replacePT;
            }}
            onLoad={(e) => {
                e.target.classList.add('!h-full');
                e.target.classList.remove('rounded-xl');
            }}
        />
    );
}

export default Image;
