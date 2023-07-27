import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getLimit, getPage, getTotalCount } from '../store/selectors/deviceSelectors';
import { deviceActions } from '../store/slices/deviceSlice';

const Pages = () => {
    const totalCount = useSelector(getTotalCount);
    const limit = useSelector(getLimit);
    const currentPage = useSelector(getPage);
    const dispatch = useDispatch();

    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const onPaginationClick = (page) => () => dispatch(deviceActions.setPage(page));

    return (
        <Pagination className="mt-5">
            {pages.map((page) =>
                <Pagination.Item
                    active={currentPage === page}
                    key={page}
                    onClick={onPaginationClick(page)}
                >
                    {page}
                </Pagination.Item>
            )}

        </Pagination>
    );
};

export default Pages;
