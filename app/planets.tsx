import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Platform, Text, View } from "react-native";

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
};

type PlanetResponse = {
  results: Planet[];
  count: number;
  next: string;
  previous: string;
};

const getPlanets = async (page: number) => {
  const response = await fetch("https://swapi.dev/api/planets/?page=" + page);
  return response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<PlanetResponse>({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    staleTime: 3000,
  });

  return (
    <View>
      <Text>Planets</Text>
      {data?.results.map((planet) => (
        <Text key={planet.name}>{planet.name}</Text>
      ))}
      <Button
        title="previous"
        onPress={() => {
          setPage(page - 1);
        }}
      ></Button>
      <Button
        onPress={() => {
          setPage(page + 1);
        }}
        title="next"
      ></Button>
    </View>
  );
};

export default Planets;
