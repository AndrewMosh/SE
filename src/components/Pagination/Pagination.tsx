// src/components/Pagination.js
import { useEffect } from "react";
import s from "./pagination.module.css";
import { AllPageProps } from "../../types/PageProps";

const Pagination: React.FC<AllPageProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                disabled={currentPage === i}
                className={currentPage === i ? s.current + " " + s.page : s.inactive + " " + s.page}
            >
                {i}
            </button>
        );
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);
    return <div className={s.pagination}>{pages}</div>;
};

export default Pagination;
