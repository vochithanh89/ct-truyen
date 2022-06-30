import clsx from 'clsx';
import { useState } from 'react';
import LibraryList from './LibraryList';
import UpdateList from './UpdateList';

function LibraryWrap() {
    const [menu, setMenu] = useState('library');

    const changeLibraryList = () => {
        setMenu('library');
    };

    const changeUpdateList = () => {
        setMenu('update');
    };

    return (
        <div className="w-full lg:w-full md:w-full p-6 md:p-2 bg-background-2 rounded-xl">
            <div className="flex text-text-0">
                <button
                    onClick={changeLibraryList}
                    className={clsx(
                        'my-4 mx-2 px-[0.125rem text-lg md:text-base border-b-2 border-solid border-transparent font-bold',
                        {
                            '!border-primary text-primary': menu === 'library',
                        },
                    )}
                >
                    Thư viện
                </button>
                <button
                    onClick={changeUpdateList}
                    className={clsx(
                        'my-4 mx-2 px-[0.125rem] text-lg md:text-base border-b-2 border-solid border-transparent font-bold',
                        {
                            '!border-primary text-primary': menu === 'update',
                        },
                    )}
                >
                    Cập nhật
                </button>
            </div>
            {menu === 'library' ? <LibraryList /> : <UpdateList />}
        </div>
    );
}

export default LibraryWrap;
