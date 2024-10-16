import Image from "next/image";
import Link from "next/link";
import { getBathrooms } from "@/lib/utils";

import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";

import {
    IconRulerMeters,
    IconBath,
    IconBed,
    IconBathTop,
    IconLocation
} from '@/lib/svgs'

interface DescBoxProps {
    text: string | number;
    icon: React.ComponentType; // Use React.ComponentType for the icon prop
    fillWhite?: boolean;
}

const DescBox: React.FC<DescBoxProps> = ({ text, icon: Icon, fillWhite = true }) => {
    return (
        <div className="desc-box">
            <span className={fillWhite ? 'icon-white' : ''}><Icon /></span>
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
                        <DescBox text={area} icon={IconRulerMeters} />
                        <DescBox text={String(bedrooms)} icon={IconBed} />
                        <DescBox text={String(bathrooms)} icon={IconBathTop} />
                        <DescBox text={String(property.barrioRef?.name)} icon={IconLocation} fillWhite={false} />
                    </div>
                </div>
            </Link>
        </div >
    );
};


/*
 m²

*/