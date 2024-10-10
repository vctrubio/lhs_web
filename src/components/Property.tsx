import Image from "next/image";
import Link from "next/link";
import { getBathrooms } from "@/lib/utils";

import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconRulerCombined, iconBed, iconBath, iconMapMarkerAlt } from '@/lib/fontawesome';

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
    const coverPhoto = property ? property.cover_url[0] : '/images/placeholder.jpg';

    const area = property.charRef.metrosCuadradros || 'N/A';
    const bedrooms = property.charRef.dormitorios || 'N/A';
    const bathrooms = getBathrooms(property) || 'N/A';

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
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={100}
                        priority
                    />
                    <div className="property-desc">
                        <DescBox text={`${area} m²`} icon={iconRulerCombined} /> {/* Square meters */}
                        {bedrooms && <DescBox text={String(bedrooms)} icon={iconBed} />}
                        {bathrooms && <DescBox text={String(bathrooms)} icon={iconBath} />}
                        <DescBox text={String(property.barrioRef?.name)} icon={iconMapMarkerAlt} /> {/* Location */}
                    </div>
                </div>
            </Link>
        </div >
    );
};
