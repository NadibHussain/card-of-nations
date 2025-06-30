import threePlayerMap from '../img/6-player.png';
import fourPlayerMap from '../img/4-player.png';
import sixPlayerMap from '../img/6-player.png';
export const maps = {
    3: {
    image: threePlayerMap,
    positions: [
      { x: 25, y: 25 }, // NW
      { x: 75, y: 25 }, // NE
      { x: 25, y: 75 }, // SW
      { x: 75, y: 75 }  // SE
    ]
  },
  4: {
    image: fourPlayerMap,
    positions: [
      { x: 25, y: 25 }, // NW
      { x: 75, y: 25 }, // NE
      { x: 25, y: 75 }, // SW
      { x: 75, y: 75 }  // SE
    ]
  },
  6: {
    image: sixPlayerMap,
    positions: [
      { x: 20, y: 30 }, 
      { x: 27, y: 60 },
      { x: 80, y: 30 },
      { x: 20, y: 80 },
      { x: 50, y: 90 },
      { x: 80, y: 80 }
    ]
  },
};