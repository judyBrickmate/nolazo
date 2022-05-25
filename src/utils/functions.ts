//ts-ignore
import Geocode from 'react-geocode';

Geocode.setApiKey(String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY));
Geocode.setLanguage('ko');
Geocode.setRegion('ko');
Geocode.enableDebug();

export const GoogleMap = async (currentAddr: string) => {
  return Geocode.fromAddress(currentAddr)
    .then((res) => {
      //   const { lat, lng } = res.results[0].geometry.location;
      //   return { lat, lng };
      return res;
    })
    .catch((err) => {
      console.log('geocoding error', err);
    });
};
