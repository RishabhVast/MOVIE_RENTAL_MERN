const searchBox = (props) => {
  return (
    
    <input
      id="search-inp"
      type="text"
      className="input ml-4 rounded lg text-black border border-black w-54"
      placeholder="Search Movie...!"
      onChange={() => {
      
        props.searchFunction(document.getElementById("search-inp").value);
      }}
    />
    
  );
};

export default searchBox;
