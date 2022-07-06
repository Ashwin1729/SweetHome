import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { Flex, Box, Text, Icon, Spinner } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "./SearchFilters";
import { useLocation } from "react-router-dom";
import Property from "./Property";
import noresult from "../assets/images/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = (props) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const purpose = params.get("purpose") || "for-rent";
  const rentFrequency = params.get("rentFrequency") || "yearly";
  const minPrice = params.get("minPrice") || "0";
  const maxPrice = params.get("maxPrice") || "1000000";
  const roomsMin = params.get("roomsMin") || "0";
  const bathsMin = params.get("bathsMin") || "0";
  const sort = params.get("sort") || "price-desc";
  const areaMax = params.get("areaMax") || "35000";
  const locationExternalIDs = params.get("locationExternalIDs") || "5002";
  const categoryExternalID = params.get("categoryExternalID") || "4";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
      );
      setProperties(data?.hits);
      setLoading(false);
    };
    fetchData();
  }, [
    purpose,
    rentFrequency,
    minPrice,
    maxPrice,
    roomsMin,
    bathsMin,
    sort,
    areaMax,
    locationExternalIDs,
    categoryExternalID,
  ]);

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {params.get("purpose")}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {loading && (
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
      {properties.length === 0 && !loading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
