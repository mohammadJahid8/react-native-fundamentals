import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Country from "./Country";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setSearch(data);
      });
  }, []);

  const handleSearch = (text) => {
    const filter = countries.filter((country) =>
      country.name.common.includes(text)
    );
    setSearch(filter);
  };

  return (
    <View>
      <Text style={style.header}>Countries:{search.length}</Text>
      <TextInput onChangeText={handleSearch} style={style.input}></TextInput>
      <ScrollView>
        {search.map((country, index) => (
          <Country country={country} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    fontSize: 40,
    marginTop: 50,
    color: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
