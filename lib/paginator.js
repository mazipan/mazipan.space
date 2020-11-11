const PER_PAGE = 10

function paginate (items, currentPage) {
  const page = parseInt(currentPage, 10) || 1
  const offset = (page - 1) * PER_PAGE

  const paginatedItems = items.slice(offset).slice(0, PER_PAGE)
  const totalPages = Math.ceil(items.length / PER_PAGE)

  const pages = []
  for (let index = 1; index < totalPages; index++) {
    pages.push(index + 1)
  }

  return {
    page,
    pages,
    perPage: PER_PAGE,
    prev: page - 1 ? page - 1 : null,
    next: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages: totalPages,
    data: paginatedItems
  }
}

exports.paginate = paginate
