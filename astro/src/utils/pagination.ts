import type { AnyCollection, PaginationProps } from '@/types/common';
import type { Page } from 'astro';

export const pickPaginationPropsFromPage = (page: Page<AnyCollection>): PaginationProps => {
  const { url, currentPage, lastPage, start, end, total } = page;
  const paginationProps = {
    url,
    currentPage,
    lastPage,
    start,
    end,
    total,
  };

  return paginationProps;
};
