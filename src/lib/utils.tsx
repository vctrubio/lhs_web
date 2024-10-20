import { Property } from '@/types/property';
import { IconPrice } from '@/lib/svgs'; // Ensure these are imported correctly

export const Logo = () => {
  return (
    <div className="logo">
      <div>L</div>
      <div>H</div>
      <div>S</div>
    </div>
  )
}

export function formatCurrency(value: number, rent: boolean = false): any {
  let formattedValue;
  if (value >= 1_000_000) {
    const millionValue = value / 1_000_000;
    formattedValue = millionValue + 'M';
  } else if (value >= 1_000) {
    const thousandValue = value / 1_000;
    formattedValue = Number.isInteger(thousandValue) ? thousandValue + 'K' : thousandValue.toFixed(0) + 'K';
  } else {
    formattedValue = value.toLocaleString('de-DE');
  }

  return (
    <div className='flex mb-2'>
      <span style={{ paddingBottom: '0px', fontSize: '22px' }}>{formattedValue}</span><IconPrice /><span className="italic">{rent ? '' : '/mes'}</span>
    </div>
  );
}

export function formatPrice(value: number): number {
  return parseFloat((value / 1_000_000).toFixed(4));
}

export function ImageToUrl(entry: any): string {
  const url = entry.fields.file.url.startsWith('http') ? entry.fields.file.url : `https:${entry.fields.file.url}`;
  return url;
}

export function extractImageUrls(entries: any[]): string[] {
  return entries.map(entry => ImageToUrl(entry));
}

export function showRenderRooms({ property }: { property: Property }) {
  return property.roomsRef.map((room, index) => {
    return (
      <div key={index} className="flex flex-col items-center">
        <img src={room.photos[0]} alt={room.title} className="w-64 h-64 object-cover rounded-lg" />
        <h3 className="text-xl font-semibold">{room.title}</h3>
        <p className="text-center">{room.description}</p>
      </div>
    );
  });
}

export function showRenderAmentities({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(property.amentitiesRef).map(([amentity, value]) => (
        <div key={amentity} className="flex items-center">
          <span className="text-lg font-semibold text-gray-700">
            {amentity}:
          </span>
          <span className="ml-2 text-gray-600">{value ? 'Yes' : 'No'}</span>
        </div>
      ))}
    </div>
  );
}

export function getRooms({ property }: { property: Property }) {
  if (!property.charRef) return 0;

  const { banos = 0, aseo = 0, dormitorios = 0 } = property.charRef;
  return banos + aseo + dormitorios
}

export function getBathrooms(property: Property) {
  if (!property.charRef) return 0;

  const { banos = 0, aseo = 0 } = property.charRef;
  return banos + aseo;
}
