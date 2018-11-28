const images = [
  "https://washington-org.s3.amazonaws.com/s3fs-public/children-viewing-henry-the-elephant-at-natural-history-museum_credit-department-of-state-iip-photo-archive.jpg",
  "https://img.sunset02.com/sites/default/files/image/2016/10/main/route-66-roadtrip-santa-monica-pier-0512.jpg",
  "https://www.everlyhotelhollywood.com/images/tout/kimpton-everly-hollywood-hills-palms-76a1d246.jpg",
  "https://suitcasemag.com/wp-content/uploads/2015/06/entourage-sunset-strip.jpg",
  "https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_1170x375/public/field/image/GoldenGate_Skyline.jpg_0.jpg?itok=l_wNjT9_&timestamp=1484702614",
  "https://upload.wikimedia.org/wikipedia/en/f/fa/DramaticSFskyline2017.jpg"
];

export const getBlackImage = () => {
  return "https://upload.wikimedia.org/wikipedia/commons/1/1e/A_blank_black_picture.jpg";
}

export const getRandomImage = () => {
  return images[Math.floor(Math.random() * 6)];
}
