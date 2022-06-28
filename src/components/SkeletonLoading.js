import clsx from 'clsx';

function SkeletonLoading({ className, count = 1, circle = false, width = '100%', height = '1rem' }) {
    return (
        <div className="animate-pulse">
            {[...new Array(count)].map((item, index) => {
                return (
                    <div
                        key={index}
                        className={clsx('bg-background-3 peer mb-2 rounded-xl', className, {
                            'rounded-full': circle,
                        })}
                        style={{
                            width: circle ? height : width,
                            height,
                        }}
                    ></div>
                );
            })}
        </div>
    );
}

export default SkeletonLoading;
