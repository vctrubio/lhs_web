import { House } from "@/types/house";
import Image from "next/image";
import Link from "next/link";
import { getBathrooms, getTotalRooms } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faBed, faMapMarkerAlt, faBath } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { Property } from "@/types/property";
import { inherits } from "util";

function formatCurrency(value: number, rent: boolean = false): any {
    let formattedValue;
    if (value >= 1_000_000) {
        formattedValue = (value / 1_000_000).toFixed(1) + 'M';
    } else if (value >= 1_000) {
        formattedValue = (value / 1_000).toFixed(0) + 'K';
    } else {
        formattedValue = value.toLocaleString('de-DE');
    }

    return (
        <>
            {formattedValue} <span className="italic">€{rent ? '' : '/mes'}</span>
        </>
    );
}

interface DescBoxProps {
    text: string;
    icon: any;
}
const DescBox: React.FC<DescBoxProps> = ({ text, icon }) => {
    return (
        <div className="desc-box">
            <FontAwesomeIcon icon={icon} className="desc-icon" />
            <span>{text}</span>
        </div>
    );
};

export const PropertyCard = ({ property, cssStateHover }: { property: Property, cssStateHover: boolean }) => {
    // console.log("🚀 ~ PropertyCard ~ property:", property)
    const coverPhoto = property ? property.cover_url[0] : '/images/placeholder.jpg';

    const area = property.charRef.metrosCuadradros || 'N/A';
    const bedrooms = property.charRef.dormitorios || 'N/A';
    const bathrooms = getBathrooms({ property: property })
    return (
        <div className="property" css-state={cssStateHover ? 'on' : ''}>
            <Link href={`/propiedades/${property.url}`}>
                <div className="property-title">
                    <h1>{property.title}</h1>
                    <h2>{formatCurrency(property.precio, property.buyOrRent)}</h2>
                </div>
                <div className="property-banner">
                    <Image
                        src={coverPhoto}
                        alt={property.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />
                </div>
                <div className="property-desc">
                    <DescBox text={`${area} m²`} icon={faRulerCombined} /> {/* Square meters */}
                    {bedrooms && <DescBox text={String(bedrooms)} icon={faBed} />}
                    {bathrooms && <DescBox text={String(bathrooms)} icon={faBath} />}
                    <DescBox text={String(property.barrioRef?.name)} icon={faMapMarkerAlt} /> {/* Location */}
                </div>
            </Link>
        </div >
    );
};
