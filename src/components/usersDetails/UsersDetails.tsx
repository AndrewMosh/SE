import { useSelector } from "react-redux";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { InfoIcon, AddIcon, StarIcon, CheckCircleIcon, ChatIcon, ViewIcon } from "@chakra-ui/icons";
import styles from "./userdetails.module.css";
import { RootState } from "../../store/store";
import { UseDisclosureReturn } from "../../types/ChakraProps";

const UsersDetails: React.FC<UseDisclosureReturn> = ({ isOpen, onClose }) => {
    const user = useSelector((state: RootState) => state.user.selectedUser);

    if (!user) {
        return null;
    }

    return (
        <div>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
                    <ModalHeader style={{ textAlign: "center" }}>{user.login}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div
                            style={{
                                fontWeight: "bold",
                                marginBottom: "1rem",
                            }}
                            className={styles.card}
                        >
                            <div>
                                <div>
                                    <AddIcon mr="1rem" />
                                </div>
                                <div> Подписчиков: {user.followers_url.length}</div>
                            </div>
                            <div>
                                <div>
                                    <ChatIcon mr="1rem" />
                                </div>
                                <div> Подписок: {user.following_url.length}</div>
                            </div>
                            <div>
                                <div>
                                    <CheckCircleIcon mr="1rem" />
                                </div>
                                <div>Репозиториев: {user.repos_url.length}</div>
                            </div>
                            <div>
                                <div>
                                    <InfoIcon mr="1rem" />
                                </div>
                                <div>
                                    {" "}
                                    Статус:
                                    {user.site_admin === true ? "Администратор" : "Пользователь"}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <StarIcon mr="1rem" />
                                </div>
                                <div> Звезд: {user.starred_url.length}</div>
                            </div>
                            <div>
                                <div>
                                    <ViewIcon mr="1rem" />
                                </div>
                                <div>Избранных: {user.subscriptions_url.length}</div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button colorScheme="blue" variant="outline" fontSize="0.8rem" mr={3} mb={3} onClick={onClose}>
                                Закрыть
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UsersDetails;
