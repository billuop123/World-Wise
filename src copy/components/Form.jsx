// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Message from "./Message";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CityContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeocodingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createCity, isLoading: isLoadingAdd } = useCities();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app");
  }
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          if (!lat && !lng) return;
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.city)
            throw new Error(
              "This seems to be in the middle of nowhere,try somewhere else💩"
            );
          console.log(data);
          setCityName(data.city);
          setCountry(data.country);
          setEmoji(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  if (!lat && !lng)
    return <Message message={"Start by Clicking somewhere on the map"} />;
  if (isLoading) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoadingAdd ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id={date}
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
