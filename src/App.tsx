import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchUsers } from "./store/userSlice";
import AllUsers from "./components/AllUsers/AllUsers"; // Проверьте правильность пути
import { Input, Button } from "@chakra-ui/react";
import "./App.css";

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = () => {
        dispatch(fetchUsers(searchQuery));
        setCurrentPage(1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            dispatch(fetchUsers(searchQuery));
            setCurrentPage(1);
        }
    };

    return (
        <div className="app">
            <div className="input">
                <Input
                    placeholder="Введите логин пользователя"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button style={{ marginLeft: "20px" }} colorScheme="blue" onClick={handleSearch}>
                    Найти
                </Button>
            </div>
            <AllUsers searchQuery={searchQuery} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default App;
