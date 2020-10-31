const perPage = 10

function paginate (items, currentPage) {
  const page = parseInt(currentPage, 10) || 1
  const offset = (page - 1) * perPage

  const paginatedItems = items.slice(offset).slice(0, perPage)
  const totalPages = Math.ceil(items.length / perPage)

  const pages = []
  for (let index = 0; index < totalPages; index++) {
    pages.push(index + 1)
  }

  return {
    page,
    pages,
    perPage: perPage,
    prev: page - 1 ? page - 1 : null,
    next: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages: totalPages,
    data: paginatedItems
  }
}

exports.paginate = paginate
