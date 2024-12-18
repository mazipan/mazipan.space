async function test() {
  // eslint-disable-next-line no-console
  console.log('VERSION from env: ', process.env.NEXT_PUBLIC_SEMANTIC_VERSION);
}

(async () => {
  await test();
})();
