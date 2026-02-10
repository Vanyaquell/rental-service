import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './const';
import type { City, Point } from '../../types/city.ts';

type MapProps = {
    city: City;
    points: Point[];
    selectedPoint?: Point;
};

function Map({ city, points, selectedPoint }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useMap(mapRef, city);
    const markersRef = useRef<leaflet.Marker[]>([]);

    const defaultCustomIcon = leaflet.icon({
        iconUrl: URL_MARKER_DEFAULT,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const currentCustomIcon = leaflet.icon({
        iconUrl: URL_MARKER_CURRENT,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    useEffect(() => {
        if (map) {
            markersRef.current.forEach((marker) => {
                marker.remove();
            });
            markersRef.current = [];

            points.forEach((point) => {
                const marker = leaflet.marker(
                    [point.lat, point.lng],
                    {
                        icon: (selectedPoint &&
                            point.lat === selectedPoint.lat &&
                            point.lng === selectedPoint.lng)
                            ? currentCustomIcon
                            : defaultCustomIcon,
                    }
                ).addTo(map);

                markersRef.current.push(marker);
            });
        }
    }, [map, points, selectedPoint]);

    return (
        <div
            style={{ height: '100%' }}
            ref={mapRef}
        />
    );
}

export default Map;