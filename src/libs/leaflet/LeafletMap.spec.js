import LeafletMap from './LeafletMap';

describe('LeafleMap Class', () => {

    it('pointToLatLng(point)', () => {
        const point = [57.74, 11.94];
        const latlng = LeafletMap.pointToLatLng(point);
        expect(latlng).toHaveProperty('lat', 57.74);
        expect(latlng).toHaveProperty('lng', 11.94);
    });

    it('pointsToLatLng(points)', () => {
        const points = [
            [57.74, 11.94],
            [57.6792, 11.949]
        ];
        const latlng = LeafletMap.pointsToLatLng(points);
        expect(latlng[0]).toHaveProperty('lat', points[0][0]);
        expect(latlng[0]).toHaveProperty('lng', points[0][1]);
        expect(latlng[1]).toHaveProperty('lat', points[1][0]);
        expect(latlng[1]).toHaveProperty('lng', points[1][1]);
    });

});