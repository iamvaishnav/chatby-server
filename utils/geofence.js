const geoFence = (location, lat2, lon2) => {
    const radius = 1000;
    const R = 63710; // Earth's radius in m
    const lat1 = location.coordinates.lat;
    const lon1 = location.coordinates.lon;

    return (
        Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
        ) *
            R <
        radius
    );
};

module.exports = geoFence;
