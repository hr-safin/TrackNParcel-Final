import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import 'leaflet/dist/leaflet.css';
const SeeLocation = ({ latitude, longitude }) => {
  const position = [parseFloat(latitude), parseFloat(longitude)];
  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button color='green' onClick={() => handleOpen("xxl")} variant="gradient">
          Location
        </Button>
        <Dialog
          open={size === "xxl"}
          size={size || "xxl"}
          handler={() => handleOpen(null)}
        >
            <DialogBody>
           
              <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '99%', height: '590px' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Location: {latitude}, {longitude}
                  </Popup>
                </Marker>
              </MapContainer>
           
            </DialogBody>
            <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className=""
          >
            <span>Cancel</span>
          </Button>
         
        </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default SeeLocation;
