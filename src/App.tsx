import { useEffect, useState } from 'react'
import PokemonGallery from './components/PokemonGallery'
import type { Pokemon } from './interfaces/Pokemon'

interface PokemonListItem {
  name: string
  url: string
}

interface PokemonListResponse {
  results: PokemonListItem[]
}

interface PokemonApiResponse {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPokemon(): Promise<void> {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')

      if (!response.ok) {
        throw new Error('The Pokemon list could not be loaded.')
      }

      const list: PokemonListResponse = await response.json()
      const requests = list.results.map((item) => fetch(item.url))
      const detailResponses = await Promise.all(requests)

      if (detailResponses.some((item) => !item.ok)) {
        throw new Error('Some Pokemon details could not be loaded.')
      }

      const details: PokemonApiResponse[] = await Promise.all(
        detailResponses.map((item) => item.json()),
      )

      const formattedPokemon: Pokemon[] = details.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.sprites.front_default,
        height: item.height,
        weight: item.weight,
        types: item.types.map((entry) => entry.type.name),
      }))

      setPokemon(formattedPokemon)
    }

    fetchPokemon()
      .catch((reason: unknown) => {
        if (reason instanceof Error) {
          setError(reason.message)
        } else {
          setError('The Pokemon data could not be loaded.')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return <PokemonGallery pokemon={pokemon} loading={loading} error={error} />
}
