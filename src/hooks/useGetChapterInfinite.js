import { useInfiniteQuery } from 'react-query';

function useGetChapterInfinite(queryKey, callApi, chapterId) {
    const getMoreList = ({ pageParam = chapterId }) => {
        return callApi(pageParam);
    };

    const { isLoading, isError, isSuccess, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
        [queryKey, chapterId],
        getMoreList,
        {
            getNextPageParam: (lastPage) => {
                const { nextChapter } = lastPage;
                return nextChapter?.chapterId;
            },
        },
    );

    const result = isSuccess ? data.pages : [];

    return {
        isLoading,
        isError,
        isSuccess,
        result,
        hasNextPage,
        fetchNextPage,
    };
}

export default useGetChapterInfinite;
