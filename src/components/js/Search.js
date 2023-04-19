export default function SearchBar(props) {
  const { onSubmitSearch, handleSearch } = props;

  return (
    <>
      <div className="searchFormdiv">
        <form onSubmit={onSubmitSearch} className="searchForm">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button className="searchBtn" type="submit">
            검색
          </button>
        </form>
      </div>
      <hr />
    </>
  );
}
