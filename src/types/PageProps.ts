export interface PageProps {
    searchQuery: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export interface AllPageProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;

}