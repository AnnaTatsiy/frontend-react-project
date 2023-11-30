import ReactPaginate from "react-paginate";
import useWindowSize from "../helpers/useWindowSize.js";

export default function MyPaginate({page, lastPage, setPage}){

    const size = useWindowSize();

    function pageRangeDisplayed() {
        switch (true){
            case (size.width < 1200 && size.width > 775) :
                return 4;
            case (size.width < 775 && size.width > 435):
                return 2;
            case size.width < 434:
                return 1;
            default:
                return 8;
        }
    }

    function marginPagesDisplayed  () {
        switch (true){
            case (size.width < 1200 && size.width > 775):
                return 3;
            case size.width < 775:
                return 1;
            default:
                return 5;
        }
    }

    return (
        <div className={"d-flex justify-content-end"}>
            <ReactPaginate
                initialPage = {page - 1}
                forcePage = {page - 1}
                previousLabel={'«'}
                breakLabel={'...'}
                nextLabel={'»'}
                pageCount={lastPage}
                marginPagesDisplayed={marginPagesDisplayed()}
                pageRangeDisplayed={pageRangeDisplayed()}
                onPageChange={(e) => (setPage(e.selected+1))}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
}