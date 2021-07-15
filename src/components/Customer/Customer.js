import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  ChakraProvider,
  Button,
  Box,
  Image,
  chakra,
  Center,
  Text,
  Flex,
} from "@chakra-ui/react";
import "./Customer.css";

const Customer = () => {
  let location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(location.state.data);
  }, []);

  return (
    <>
      <ChakraProvider>
        <Flex pt={10} mt="50px">
          <Box
            w="lg"
            mx="auto"
            rounded="lg"
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
            p={8}
            rounded="md"
            bg="white"
          >
            <Flex
              flexDirection="column"
              alignContent="center"
              justifyContent="center"
            >
              <Center>
                <Image
                  borderRadius="full"
                  mb={6}
                  boxSize="200px"
                  objectPosition="center"
                  src={data.picture}
                  alt="customer-image"
                />
              </Center>
              <Center>
                <chakra.h1 fontSize="3xl" fontWeight="bold">
                  {data.name}
                </chakra.h1>
              </Center>
            </Flex>

            <Center>
              <Box>
                <Box p={2}>
                  <Text mt={4}>
                    <chakra.h1 px={2} fontSize="xl">
                      <i
                        style={{ padding: "10px" }}
                        class="fas fa-map-marker"
                      ></i>{" "}
                      {data.location}
                    </chakra.h1>
                  </Text>

                  <Text mt={4}>
                    <chakra.h1 px={2} fontSize="xl">
                      <i
                        style={{ padding: "10px" }}
                        class="fas fa-envelope"
                      ></i>
                      {data.email}
                    </chakra.h1>
                  </Text>
                  <Text mt={4}>
                    <chakra.h1 px={2} fontSize="xl">
                      <i style={{ padding: "10px" }} class="fas fa-phone"></i>{" "}
                      {data.phone}
                    </chakra.h1>
                  </Text>
                  <Text mt={4}>
                    <chakra.h1 px={2} fontSize="xl" fontWeight="bold">
                      <i style={{ padding: "10px" }} class="fas fa-coins"></i> $
                      {numberWithCommas(data.balance || 0)}
                    </chakra.h1>
                  </Text>
                </Box>
              </Box>
            </Center>

            <Center>
              <Link to="/payment" style={{ textDecoration: "none" }}>
                <Button
                  mt="20px"
                  bg="#368dff"
                  color="white"
                  p="24px"
                  size="md"
                  _hover={{ bg: "grey" }}
                >
                  TRANSFER MONEY
                </Button>
              </Link>
            </Center>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default Customer;
