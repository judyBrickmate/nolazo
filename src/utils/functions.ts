//ts-ignore
import Geocode from "react-geocode";

Geocode.setApiKey(String("AIzaSyB6OIV10dIirhIFvPQcukLV5ZX3A_ueeVk"));
Geocode.setLanguage("ko");
Geocode.setRegion("ko");
Geocode.enableDebug();

export const GoogleMap = async (currentAddr: string) => {
  return Geocode.fromAddress(currentAddr)
    .then((res) => {
      //   const { lat, lng } = res.results[0].geometry.location;
      //   return { lat, lng };
      return res;
    })
    .catch((err) => {
      console.log("geocoding error", err);
    });
};
