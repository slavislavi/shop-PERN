import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ currentPage, limit, totalCount, setCurrentPage }) => {
    const pagesCount = Math.ceil(totalCount / limit);

    const isPaginationShown = pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const changePage = (number) => {
        if (currentPage === number) {
            return;
        };
        setCurrentPage(number);
    };

    const onPageNumberClick = (pageNumber) => () => changePage(pageNumber);

    const onPreviousPageClick = (pageNumber) => () => {
        const previousPage = pageNumber - 1;
        changePage(previousPage);
    };

    const onNextPageClick = (pageNumber) => () => {
        const nextPage = pageNumber + 1;
        changePage(nextPage);
    };

    let isPageNumberOutOfRange;

    const pageNumbers = Array.from({ length: pagesCount }, (_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

        if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
            isPageNumberOutOfRange = false;
            return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={onPageNumberClick(pageNumber)}
                    active={pageNumber === currentPage}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} className="muted" />;
        }

        return null;
    });

    useEffect(() => {
        if (currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
    }, [pagesCount]);

    return (
        <>
            {isPaginationShown && (
                <Pagination className="mt-5 justify-content-center" data-bs-theme="dark">
                    <Pagination.Prev
                        onClick={onPreviousPageClick(currentPage)}
                        disabled={isCurrentPageFirst}
                    />
                    {pageNumbers}
                    <Pagination.Next
                        onClick={onNextPageClick(currentPage)}
                        disabled={isCurrentPageLast}
                    />
                </Pagination>
            )}
        </>
    );
};

export default PaginationBar;
