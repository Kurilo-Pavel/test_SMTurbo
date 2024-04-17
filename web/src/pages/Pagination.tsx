import {useState} from "react";
import classNames from "classnames";

type PaginationProps = {
  usersCount: number;
  setNewUsers: (value: []) => void;
}

const Pagination = ({usersCount, setNewUsers}: PaginationProps) => {
  const [page, setPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(1)
  const count = 10;
  let arr = []
  for (let i = 1 + page; i <= count + page; ++i) {
    arr = [...arr, i]
  }

  const handleClick = (number) => {
    if (page + number >= 0 && page + number <= usersCount)
      setPage((prev) => prev + number);
  };

  const getUsers = async (value) => {
    setCurrentPage(value);
    const response = await fetch(`http://localhost:3000/users/${value}`);
    const data = await response.json();
    setNewUsers(data.users);
  }

  return <div className="block_pagination">
    <span className="link_page" onClick={() => handleClick(-count)}>&laquo;</span>
    <span className="link_page" onClick={() => handleClick(-1)}>&lsaquo;</span>
    {arr.map((numberPage: number) => {
      return <span className={classNames("link_page",{"current_page": currentPage === numberPage})} key={numberPage} onClick={() => {
        getUsers(numberPage);
      }}
      >{numberPage}</span>
    })}
    <span className="link_page" onClick={() => handleClick(1)}>&rsaquo;</span>
    <span className="link_page" onClick={() => handleClick(count)}>&raquo;</span>

  </div>
};
export default Pagination;
