import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  Image,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { filterData, getFilterValues } from "../utils/filterData";
import noresult from "../assets/images/noresult.svg";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const newParams = {};

const searchProperties = (filteredValues, setSearchParams) => {
  const values = getFilterValues(filteredValues);

  values.forEach((item) => {
    if (item.value) {
      newParams[item.name] = item.value;
    }
  });
  setSearchParams({ ...newParams });
  // console.log(newParams);
};

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [showLocations, setShowLocations] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);
  const [locationData, setLocationData] = useState();
  // const location = useLocation();
  // const query = new URLSearchParams(location.pathname);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setSearchLoad(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setSearchLoad(false);
        setLocationData(data?.hits);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties(
                { [filter.queryName]: e.target.value },
                setSearchParams
              )
            }
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir="column">
        <Button
          onClick={() => setShowLocations(!showLocations)}
          border="1px"
          borderColor="gray.200"
          marginTop="2"
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            <Input
              placeholder="Type Here"
              value={searchTerm}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zindex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {searchLoad && <Spinner margin="auto" marginTop="3" />}
            <Box height="300px" overflow="auto">
              {locationData?.map((location) => (
                <Box
                  key={location.id}
                  onClick={() => {
                    searchProperties(
                      {
                        locationExternalIDs: location.externalID,
                      },
                      setSearchParams
                    );
                    setShowLocations(false);
                    setSearchTerm(location.name);
                  }}
                >
                  <Text
                    cursor="pointer"
                    bg="gray.200"
                    p="2"
                    borderBottom="1px"
                    borderColor="gray.100"
                  >
                    {location.name}
                  </Text>
                </Box>
              ))}
              {!searchLoad && !locationData?.length && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDir="column"
                  marginTop="5"
                  marginBottom="5"
                >
                  <Image src={noresult} />
                  <Text fontSize="xl" marginTop="3">
                    Waiting to search!
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
