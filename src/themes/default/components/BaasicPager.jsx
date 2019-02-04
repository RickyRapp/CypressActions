import React from 'react';
import ReactPaginate from 'react-paginate';
import { defaultTemplate } from 'core/utils';

function BaasicPagerTemplate({ queryUtility, ...otherProps }) {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      pageCount={queryUtility.totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      forcePage={queryUtility.filter.pageNumber - 1}
      onPageChange={data => queryUtility.changePage(data.selected + 1)}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
}

export default defaultTemplate(BaasicPagerTemplate);
