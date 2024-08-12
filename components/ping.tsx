function Ping({ color }) {
  return (
    <span class="relative flex h-3 w-3">
      <span class={`${color} animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
      <span class={`${color} relative inline-flex rounded-full h-3 w-3`}></span>
    </span>
  );
}

export default Ping;
