import {
    Box,
    Divider,
    Flex,
    Heading,
    Text,
    Spacer,
    Table,
    Th,
    Thead,
    Tr,
    Tbody,
    Td,
    IconButton,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodBarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import { IGraphData } from "../Interfaces/GraphData";
import { ItemData } from "../Interfaces/ItemData";
import { useStore } from "../Store/store";
import axios from "../Utils/axios";
import LeaderboardPng from "../leaderboard.png";
import { NutritionModal } from "../Components/NutritionModal";
import CenterSpinner from "../Components/CenterSpinner";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
    let navigate = useNavigate();
    const phone = Number(useStore((state) => state.phoneNumber));
    const [isDone, setDone] = useState<boolean>(false);
    const [frequentOrders, setFrequentOrders] = useState<IGraphData[]>([]);
    const [userData, setUserData] = useState<ItemData[]>([]);
    const [monthlyData, setMonthlyData] = useState<IGraphData[]>([]);
    const [restaurantFrequency, setRestaurantFrequency] = useState<
        IGraphData[]
    >([]);
    const [spentValues, setSpentValues] = useState<IGraphData[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [itemName, setItemName] = useState<string>("");

    useEffect(() => {
        const getUserData = async () => {
            const { data } = await axios.get(`/order/${phone}`);
            const {
                user,
                frequencyPerFoodName,
                monthlyData,
                restaurantFrequency,
                spentValues,
            } = data;
            setUserData(user.items.slice(0, 5));
            setFrequentOrders(frequencyPerFoodName);
            setMonthlyData(monthlyData);
            setRestaurantFrequency(restaurantFrequency);
            console.log(spentValues);
            setSpentValues(spentValues);
            setDone(true);
        };
        getUserData();
    }, []);
    if (!isDone) return <CenterSpinner />;
    else
        return (
            <>
                <NutritionModal
                    itemName={itemName}
                    isOpen={isOpen}
                    onClose={onClose}
                />
                <Box h="20" bgColor="#FAFAFA">
                    <Flex flexDir="row" justifyContent="center">
                        <Heading textAlign="center" my="4">
                            Dashboard
                        </Heading>
                        <Flex w="100%" position="absolute" mt="4px">
                            <Spacer />
                            <Heading
                                justifySelf="center"
                                size="sm"
                                m="2%"
                                onClick={() => {
                                    navigate("/profile");
                                }}
                                _hover={{
                                    bg: "white",
                                    color: "#F06575",
                                }}
                            >
                                Profile
                            </Heading>
                            <Heading
                                justifySelf="center"
                                size="sm"
                                onClick={() => {
                                    navigate("/recom");
                                }}
                                m="2%"
                                _hover={{
                                    bg: "white",
                                    color: "#F06575",
                                }}
                            >
                                Recommendations
                            </Heading>
                            <Box
                                mr="2%"
                                onClick={() => {
                                    navigate("/leaderboard");
                                }}
                            >
                                <Image boxSize="50px" src={LeaderboardPng} />
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
                <Flex flexWrap="wrap" justifyContent="space-around">
                    <Box
                        bgColor="#FAFAFA"
                        ml="20"
                        py="26px"
                        w="631px"
                        alignSelf="left"
                        border="1px solid rgba(0, 0, 0, 0.05);"
                        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                        borderRadius="20px"
                        h="490px"
                        my="20"
                        px="35px"
                    >
                        <Box mt="-5">
                            <Heading my="4" fontSize="lg">
                                Monthly Expenditure
                            </Heading>
                            <Divider />
                            <PieChart data={spentValues} />
                        </Box>
                    </Box>
                    <Box
                        bgColor="#FAFAFA"
                        py="26px"
                        w="631px"
                        ml="20"
                        alignSelf="left"
                        border="1px solid rgba(0, 0, 0, 0.05);"
                        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                        borderRadius="20px"
                        h="490px"
                        my="20"
                        px="35px"
                    >
                        <Box mt="-5">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Order Time</Th>
                                        <Th>Order Name</Th>
                                        <Th>Total Cost</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {userData.map((item) => {
                                        return (
                                            <Tr
                                                onClick={() => {
                                                    setItemName(item.name);
                                                    onOpen();
                                                    console.log("here");
                                                    console.log(isOpen);
                                                }}
                                            >
                                                <Td>{item.order_time}</Td>
                                                <Td>{item.name}</Td>
                                                <Td>{item.total}</Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                    <Box
                        bgColor="#FAFAFA"
                        py="26px"
                        ml="20"
                        w="631px"
                        alignSelf="right"
                        border="1px solid rgba(0, 0, 0, 0.05);"
                        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                        borderRadius="20px"
                        h="490px"
                        my="20"
                        px="35px"
                    >
                        <Box mt="-3">
                            <Heading my="4" fontSize="lg">
                                Frequent Orders
                            </Heading>
                            <Divider />
                            <FoodBarChart data={frequentOrders} />
                        </Box>
                    </Box>
                    <Box
                        bgColor="#FAFAFA"
                        py="26px"
                        ml="20"
                        alignSelf="left"
                        w="631px"
                        border="1px solid rgba(0, 0, 0, 0.05);"
                        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                        borderRadius="20px"
                        h="490px"
                        my="20"
                        px="35px"
                    >
                        <Box mt="-3">
                            <Heading my="4" fontSize="lg">
                                Frequently Used Restaurants
                            </Heading>
                            <Divider />
                            <FoodBarChart data={restaurantFrequency} />
                        </Box>
                    </Box>
                    <Box
                        bgColor="#FAFAFA"
                        py="26px"
                        w="631px"
                        border="1px solid rgba(0, 0, 0, 0.05);"
                        boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
                        borderRadius="20px"
                        h="490px"
                        my="20"
                        px="35px"
                    >
                        <Box mt="-3">
                            <Heading my="4" fontSize="lg">
                                Monthly Data
                            </Heading>
                            <Divider />
                            <FoodBarChart data={monthlyData} />
                        </Box>
                    </Box>
                </Flex>
            </>
        );
};

export default DashBoard;
