function formatThousand (n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

exports.formatThousand = formatThousand
