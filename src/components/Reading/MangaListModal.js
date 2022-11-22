import { memo } from 'react';
import Modal from '../Modal';
import { FaListUl } from 'react-icons/fa';
import clsx from 'clsx';
import useModal from '../../hooks/useModal';

function MangaListModal({ chapters, currentChapter, onSelectedChange }) {
    const { isOpen, toggle } = useModal();

    return (
        <>
            <button
                onClick={toggle}
                className="flex items-center justify-center w-[144px] p-3 md:px-3 md:py-2 mx-2 xs:mx-[0.125rem] rounded-lg text-sm text-text-0 bg-background-3 lg:text-base"
            >
                <FaListUl className="mr-2 text-base" />
                {currentChapter.chapterName}
            </button>
            <Modal className="bg-background-0 bg-opacity-60" isOpen={isOpen} toggle={toggle}>
                <div className="table-auto flex flex-col p-4 rounded-xl max-h-[60vh] w-[30vw] lg:w-[60vw] md:w-[80vw] scrollbar-overlay absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-background-2 text-text-0">
                    <table onClick={(e) => e.stopPropagation()} className="table-auto w-full">
                        <tbody>
                            {chapters.map((chapter, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="flex p-2">
                                            <button
                                                onClick={() => {
                                                    onSelectedChange(chapter);
                                                    toggle();
                                                }}
                                                className={clsx(
                                                    'line-clamp-2 hover:text-primary text-left transition',
                                                    {
                                                        'text-primary': chapter.chapterId === currentChapter.chapterId,
                                                    },
                                                )}
                                            >
                                                {chapter.chapterName}
                                            </button>
                                        </td>
                                        <td className="text-end text-text-1 italic p-2">{chapter.updatedAt}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
}

export default memo(MangaListModal);
