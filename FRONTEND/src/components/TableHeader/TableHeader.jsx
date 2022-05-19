import React from "react";

const TableHeader = (props) => {


    const { columns , onSort , sortColumn } = props
    const raiseSort = ( column) =>{
      let newSortColumn = {...sortColumn};
      if(sortColumn.path  === column.path){
        if(sortColumn.order === 1){
          newSortColumn.order = -1;
        }else
          newSortColumn.order = 1;
        
      }else{
        newSortColumn.path = column.path;
        newSortColumn.order = 1;
      }

      onSort(newSortColumn)

    }
    let displaySortIcon = (column) => {
      if (sortColumn.path !== column.path) return null;
      return sortColumn.order === 1 ? (
        <ion-icon name="arrow-round-up"></ion-icon>
      ) : (
        <ion-icon name="arrow-round-down"></ion-icon>
      );
    };

    return (   
    <thead className=" text-white uppercase bg-gray-200 dark:bg-black dark:text-white font-serif  text-lg ">
    <tr>
      {columns.map(c=>
          <th  className="px-6 py-3 pointer"  style = {{ cursor: "pointer" }} key={c.path || c.key} 
          onClick={()=> raiseSort(c)}>
          {c.header}{displaySortIcon(c)}</th>
      )}
    </tr>
  </thead> );
}
 
export default TableHeader;