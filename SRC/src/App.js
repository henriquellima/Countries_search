import { useEffect, useState } from "react";

import Card from "./componentes/card";

function App() {
  const [CountriesList, setCountriesList] = useState([]);
  const [Busca, setBusca] = useState("");
  const [ListaCrua, setListaCrua] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function data() {
      setLoading(true);
      const response = await fetch("https://restcountries.com/v3/all");
      const CountriesList = await response.json();
      let CountriesListFiltred = await CountriesList.map((country) => {
        return { name: country.name.common, flag: country.flags[0] };
      });
      CountriesListFiltred = CountriesListFiltred.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setListaCrua(CountriesListFiltred);
      setCountriesList(CountriesListFiltred);
      setLoading(false);
    }
    ListaCrua.length === 0 && data();
  }, []);

  useEffect(() => {
    async function dataFiltred() {
      let CountriesListNameFiltred = await ListaCrua.filter((contry) => {
        const busca = Busca;
        const name = contry.name;
        const cutedName = name.substring(0, busca.length);
        if (busca.toLowerCase() === cutedName.toLowerCase()) {
          console.log(cutedName);
          return true;
        } else {
          return false;
        }
      });
      CountriesListNameFiltred = CountriesListNameFiltred.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      console.log(CountriesListNameFiltred);
      setCountriesList(CountriesListNameFiltred);
    }

    Busca !== "" && dataFiltred();
    Busca === "" && setCountriesList(ListaCrua);
  }, [Busca]);

  return (
    <div className="App">
      <input
        placeholder="Search Here"
        className="input"
        value={Busca}
        onChange={(e) => setBusca(e.target.value)}
      ></input>
      {Loading && <span>Carregando...</span>}
      {CountriesList.map((country) => {
        return <Card name={country.name} flag={country.flag}></Card>;
      })}
    </div>
  );
}

export default App;
