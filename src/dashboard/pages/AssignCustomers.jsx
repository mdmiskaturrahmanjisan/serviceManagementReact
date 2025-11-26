// import { useState } from "react";
// import { useAssignment } from "../../hooks/useAssignment";
// import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

// export default function AssignCustomers() {
//   const [deliveryManId, setDeliveryManId] = useState("");
//   const [polygon, setPolygon] = useState([
//     { lat: 23.780887, lng: 90.279237 },
//     { lat: 23.780887, lng: 90.407000 },
//     { lat: 23.751200, lng: 90.400200 },
//     { lat: 23.751200, lng: 90.279237 },
//   ]);

//   const { customers, assignCustomers, loading } = useAssignment();

//   const handleAssign = async () => {
//     if (!deliveryManId) return alert("Enter delivery man ID");
//     if (!polygon.length) return alert("Draw a polygon first");

//     await assignCustomers(deliveryManId, polygon);
//   };

//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//   };

//   const center = { lat: 23.775, lng: 90.35 };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Assign Customers</h2>

//       <div className="flex mb-4">
//         <input
//           type="text"
//           placeholder="Delivery Man ID"
//           value={deliveryManId}
//           onChange={(e) => setDeliveryManId(e.target.value)}
//           className="border p-2 w-64"
//         />
//         <button
//           onClick={handleAssign}
//           className="ml-3 px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {loading ? "Assigning..." : "Assign"}
//         </button>
//       </div>

//       <h3 className="text-lg font-semibold mb-2">Draw Polygon (Drag vertices)</h3>

//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
//           <Polygon
//             paths={polygon}
//             editable={true}       // allow vertices to be dragged
//             draggable={true}     // move the polygon
//             onMouseUp={() => setPolygon([...polygon])} // update polygon after drag
//             options={{
//               fillColor: "rgba(66,133,244,0.3)",
//               strokeColor: "#4285F4",
//               strokeWeight: 2,
//             }}
//           />
//         </GoogleMap>
//       </LoadScript>

//       <h3 className="text-lg font-semibold mt-6">Sorted Customers (Nearest First)</h3>
//       <ul className="mt-3">
//         {customers.map((cust) => (
//           <li key={cust.id} className="py-1 border-b">
//             <strong>{cust.name}</strong> – {cust.address} — {cust.distance.toFixed(2)} km
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import { useAssignment } from "../../hooks/useAssignment";

// Leaflet
import L from "leaflet";
window.L = L;  // ⬅️ REQUIRED !!!

// Styles
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Draw plugin
import "leaflet-draw";

export default function AssignCustomers() {
  const [deliveryManId, setDeliveryManId] = useState("");
  const [polygon, setPolygon] = useState([]);
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);

  const { customers, assignCustomers, loading } = useAssignment();

  useEffect(() => {
    if (mapRef.current) return;

    // Create map
    const map = L.map("map").setView([23.775, 90.35], 12);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    // Draw Toolbar
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        polyline: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    // On Create
    map.on(L.Draw.Event.CREATED, (e) => {
      drawnItems.clearLayers();
      drawnItems.addLayer(e.layer);

      const coords = e.layer.getLatLngs()[0].map((p) => ({
        lat: p.lat,
        lng: p.lng,
      }));

      setPolygon(coords);
      console.log("Polygon Created:", coords);
    });

    // On Edit
    map.on(L.Draw.Event.EDITED, (e) => {
      e.layers.eachLayer((layer) => {
        const coords = layer.getLatLngs()[0].map((p) => ({
          lat: p.lat,
          lng: p.lng,
        }));
        setPolygon(coords);
        console.log("Polygon Edited:", coords);
      });
    });

    // On Delete
    map.on(L.Draw.Event.DELETED, () => {
      setPolygon([]);
      console.log("Polygon deleted");
    });
  }, []);

  const handleAssign = () => {
    if (!deliveryManId) return alert("Enter delivery man ID");
    if (!polygon.length) return alert("Draw a polygon first");
    assignCustomers(deliveryManId, polygon);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assign Customers</h2>

      <input
        type="text"
        value={deliveryManId}
        onChange={(e) => setDeliveryManId(e.target.value)}
        placeholder="Delivery Man ID"
        className="border p-2 mb-4"
      />

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>

      <div
        id="map"
        style={{
          height: "400px",
          width: "100%",
          marginTop: "20px",
        }}
      />

      <h3 className="text-lg font-semibold mt-6">
        Sorted Customers (Nearest First)
      </h3>

      <ul className="mt-3">
        {customers.map((cust) => (
          <li key={cust.id} className="py-1 border-b">
            <strong>{cust.name}</strong> – {cust.address} —{" "}
            {cust.distance.toFixed(2)} km
          </li>
        ))}
      </ul>
    </div>
  );
}
