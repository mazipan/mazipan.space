function formatThousand (n) {
  return new Intl.NumberFormat('id-ID').format(n)
}

exports.formatThousand = formatThousand
