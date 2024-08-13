function Ping({ color }) {
  return (
    <span class="relative flex h-2 w-2">
      <span class={`${color} absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
      <span class={`${color} relative inline-flex rounded-full h-2 w-2`}></span>
    </span>
  );
}

export default Ping;
