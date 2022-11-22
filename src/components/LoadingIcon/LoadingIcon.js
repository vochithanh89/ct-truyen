import clsx from 'clsx';
import styles from './LoadingIcon.module.scss';

function LoadingIcon({ className }) {
    return (
        <div className="text-center">
            <div className={clsx(className, styles['lds-ellipsis'])}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingIcon;
