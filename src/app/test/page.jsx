import LeftBar from "@/components/CredBar";
import NavBar from "@/components/NavBar";

const PropertyCharacteristics = ({ characteristics }) => {
    if (!characteristics) return null;

    const labels = {
        tipoDePropiedad: 'Tipo de Propiedad',
        dormitorios: 'Dormitorios',
        banos: 'Baños',
        balcones: 'Balcones',
        metrosCuadradros: 'M²'
    };

    return (
        <div>
            {Object.entries(labels).map(([key, label]) => (
                key in characteristics && (
                    <div key={key}>
                        <strong>{label}:</strong> {characteristics[key]}
                    </div>
                )
            ))}
        </div>
    );
};

const PropertyPricing = ({ precio, precioIbi, precioComunidad }) => {
    return (
        <div>
            {precio !== undefined && (
                <div>
                    <strong>Precio:</strong> {precio}
                </div>
            )}
            {precioIbi !== undefined && precioIbi !== 0 && (
                <div>
                    <strong>Precio IBI:</strong> {precioIbi}
                </div>
            )}
            {precioComunidad !== undefined && precioComunidad !== 0 && (
                <div>
                    <strong>Precio Comunidad:</strong> {precioComunidad}
                </div>
            )}
        </div>
    );
};

export const ExampleHouse = ({ property }) => {
    if (!property)
        return null;
    console.log("🚀 ~ ExampleHouse ~ property:", property)
    return (
        <div className="middle">
            <div>{property.title}</div>
            <PropertyPricing
                precio={property.precio}
                precioIbi={property.precioIbi}
                precioComunidad={property.precioComunidad}
            />
            <PropertyCharacteristics characteristics={property.charRef} />
            <div>{property.reformado ? 'Reformado' : 'Para Reformar'}</div>
            <div>{property.barrioRef.name}</div>
            <div></div>
        </div>
    )
}

export const LeftSideBar = ({ property }) => {
    return (
        <div className="sidebar">
            <div>LHS</div>
            <div>Menu Select</div>
            <div className="sidebar-content">
                <ExampleHouse property={property} />
            </div>
            <div>ICONS</div>
        </div>
    )
}


const Testing = () => {
    return (
        <>
            <LeftSideBar />
        </>
    );
}

export default Testing;