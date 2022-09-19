const PER_PAGE = 9

function paginate (items, currentPage) {
  const page = parseInt(currentPage, 10) || 1
  const offset = page === 1 ? 0 : (page - 1) * PER_PAGE

  const tempItems = [].concat(items)

  const paginatedItems = tempItems.slice(offset).slice(0, PER_PAGE)
  const totalPages = Math.ceil(items.length / PER_PAGE)

  const pages = []
  for (let index = 1; index <= totalPages; index++) {
    pages.push(index)
  }

  return {
    page,
    pages,
    perPage: PER_PAGE,
    prev: page === 1 ? null : page - 1,
    next: page === totalPages ? null : page + 1,
    total: items.length,
    totalPages: totalPages,
    slugs: paginatedItems
  }
}

exports.paginate = paginate
