// constants/roomTypes.js

import Bathroom from "../assets/Icon/Bathroom.svg";
import BedRoom from "../assets/Icon/BedRoom.svg";
import Dick from "../assets/Icon/Dick.svg";
import Door from "../assets/Icon/Door.svg";
import DringRoom from "../assets/Icon/DringRoom.svg";
import File from "../assets/Icon/file.svg";
import HomeOffice from "../assets/Icon/HomeOffice.svg";
import House from "../assets/Icon/House.svg";
import kitchen from "../assets/Icon/kitchen.svg";
import LandScaping from "../assets/Icon/LandScaping.svg";
import LivingRoom from "../assets/Icon/LivingRoom.svg";
import Roof from "../assets/Icon/Roof.svg";
import Side from "../assets/Icon/Side.svg";

export const roomTypes = [
  {
    id: 1,
    name: "Living Room",
    description: "Sofas, chairs and entertainment areas",
    image: LivingRoom,
  },
  {
    id: 2,
    name: "Bedroom",
    description: "Beds, storage, and personal spaces",
    image: BedRoom,
  },
  {
    id: 3,
    name: "Kitchen",
    description: "Cabinets, counters, and appliances",
    image: kitchen,
  },
  {
    id: 4,
    name: "Bathroom",
    description: "Vanities, showers, and fixtures",
    image: Bathroom,
  },
  {
    id: 5,
    name: "Dining Room",
    description: "Tables, chairs, and serving areas",
    image: DringRoom,
  },
  {
    id: 6,
    name: "Home Office",
    description: "Desks, storage, and workspaces",
    image: HomeOffice,
  },
   {
    id: 7,
    name: "Kids Room",
    description: "Themes, playful furniture, bright colors.",
    image: File,
  },
];


 
export const exteriorRoomTypes = [
  {
    id: 101,
    name: "House Facade",
    description: "Front exterior walls and overall appearance",
    image: House, // replace with actual SVG later
  },
  {
    id: 102,
    name: "Siding",
    description: "External wall coverings and materials",
    image: Side,
  },
  {
    id: 103,
    name: "Deck & Patio",
    description: "Outdoor living spaces",
    image: Dick,
  },
  {
    id: 104,
    name: "Landscaping",
    description: "Plants, pathways, and outdoor features",
    image: LandScaping,
  },
    {
    id: 105,
    name: "Roof",
    description: "Roofing materials and colors",
    image: Roof,
  },  {
    id: 106,
    name: "Doors & Windows",
    description: "Entry doors and window styles",
    image: Door,
  },
];