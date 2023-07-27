import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap';

const Pages = () => {
    const dispatch = useDispatch();
    const pages = [1, 2, 3, 4, 5];

    return (
        <Pagination className="mt-5">
            {pages.map((page) =>
                <Pagination.Item>{page}</Pagination.Item>
            )}

        </Pagination>
    );
};

export default Pages;
