function Pagination({ page, setPage }) {
  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div className="pagination">
      <button onClick={previousPage}> ‹ </button>

      <button
        className={page === 1 ? "active" : ""}
        onClick={function () {
          setPage(1);
        }}
      >
        1
      </button>

      <button
        className={page === 2 ? "active" : ""}
        onClick={function () {
          setPage(2);
        }}
      >
        2
      </button>

      <button
        className={page === 3 ? "active" : ""}
        onClick={function () {
          setPage(3);
        }}
      >
        3
      </button>

      <button
        className={page === 4 ? "active" : ""}
        onClick={function () {
          setPage(4);
        }}
      >
        4
      </button>

      <button
        className={page === 5 ? "active" : ""}
        onClick={function () {
          setPage(5);
        }}
      >
        5
      </button>

      <button onClick={nextPage}>›</button>
    </div>
  );
}

export default Pagination;
