import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import axios from "../Utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import { useState } from "react";

interface LoginData {
  phone: string;
  password: string;
}

const Login = () => {
  const setPhno = useStore((state: any) => state.setPhoneNumber);
  const setPwd = useStore((state: any) => state.setPassword);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
        console.log(data.phone);
        setPhno(data.phone);
        setPwd(data.password);
        setIsLoading(true);
        axios
            .post("http://localhost:3530/auth/login", data)
            .then((res) => {
                const {data} = res;
                if(data.isDataStored)
                    navigate("/dash");
                else
                    navigate("/profile");

            }).finally(()=>{
              setIsLoading(false);
            });
  };

  return (
    <>
            <Flex w="100%" position="absolute">
                <Spacer />
                <Heading
                    justifySelf="center"
                    size="md"
                    width="5%"
                    m="2%"
                    onClick={() => {
                        navigate("/");
                    }}
                    _hover={{
                        bg: "white",
                        color: "#F06575"
                    }}
                >
                    Login
                </Heading>
                <Heading
                    justifySelf="center"
                    size="md"
                    onClick={() => {
                        navigate("/signup");
                    }}
                    width="5%"
                    m="2%"
                    _hover={{
                        bg: "white",
                        color: "#F06575"
                    }}
                >
                    Sign Up
                </Heading>
            </Flex>
      <Flex justify="center" flexDir="column">
        <Box
          bgColor="#FAFAFA"
          py="26px"
          w="631px"
          border="1px solid rgba(0, 0, 0, 0.05);"
          boxShadow="-2px -2px 8px rgba(0, 0, 0, 0.02), 6px 6px 12px rgba(0, 0, 0, 0.08);"
          borderRadius="20px"
          h="400px"
          mx="auto"
          my="200"
          px="35px"
        >
          <Heading mb="2" textAlign="center">
                    Cut-It
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider marginBottom="10" />
            <Stack spacing={4}>
              <FormControl id="phone" display="flex" isRequired>
                <Flex flexDirection="row">
                  <FormLabel
                    fontSize="18px"
                    display="flex"
                    justifyContent="center"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    type="Input"
                    mb="12"
                    {...register("phone")}
                    w={358}
                    flex={{ lg: "1", base: "none" }}
                    name="phone"
                    _focus={{
                      border: "#F06575 solid 2px",
                    }}
                  />
                </Flex>
              </FormControl>
              <FormControl id="password" display="flex" isRequired>
                <Flex flexDirection="row">
                  <FormLabel
                    fontSize="18px"
                    display="flex"
                    justifyContent="center"
                  >
                    Password
                  </FormLabel>
                  <Input
                    mb="8"
                    w={400}
                    {...register("password")}
                    flex={{ lg: "1", base: "none" }}
                    name="password"
                    type="password"
                    _focus={{
                      border: "#F06575 solid 2px",
                    }}
                  />
                </Flex>
              </FormControl>
            </Stack>
            <Button
              justifySelf="center"
              borderRadius="lg"
              size="lg"
              width="25%"
              type="submit"
              backgroundColor="#FAFAFA"
              fontWeight="700"
              boxShadow="4px 4px 24px rgba(0, 0, 0, 0.08);"
              border="3px solid #F07381;"
              transition="all 500ms ease"
              _active={{
                bg: "#F06575",
                color: "white",
              }}
              _hover={{
                bg: "#F06575",
                color: "white",
              }}
              _focus={{
                boxShadow: "transparent",
              }}
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
