function Ping({ color, animate }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`${color} ${animate} absolute inline-flex h-full w-full rounded-full opacity-75`}
      ></span>
      <span
        className={`${color} relative inline-flex rounded-full h-3 w-3`}
      ></span>
    </span>
  );
}

export default Ping;
