import { Metadata, ResolvingMetadata } from 'next'
import { fetchPropertyByID } from '@/lib/bridges'
import PropertyView from '@/components/PropertyView'

type Props = {
  params: { slug: string }
}

// Generate metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
  const property = await fetchPropertyByID(slug)

  return {
    title: property?.title || 'Propiedad',
    description: property?.description || 'Detalles de la propiedad',
    openGraph: {
      title: property?.title,
      description: property?.description,
      images: property?.photos_url[0] ? [property.photos_url[0]] : [],
    },
  }
}

// Page component
export default async function CardIdPage({ params }: Props) {
  const property = await fetchPropertyByID(params.slug)
  
  if (!property) {
    return <div>Loading...</div>
  }
  
  return <PropertyView property={property} />
}
