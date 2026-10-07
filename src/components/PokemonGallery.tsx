import styled from 'styled-components'
import type { Pokemon } from '../interfaces/Pokemon'

interface PokemonGalleryProps {
  pokemon: Pokemon[]
  loading: boolean
  error: string
}

const Page = styled.main`
  width: min(1100px, 92%);
  margin: 0 auto;
  padding: 36px 0 52px;
`

const Header = styled.header`
  margin-bottom: 30px;
  padding: 28px;
  border-radius: 12px;
  background-color: #2f5d50;
  color: white;
  text-align: center;

  h1 {
    margin: 0 0 8px;
    font-size: calc(28px + 1vw);
  }

  p {
    margin: 0;
  }
`

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  overflow: hidden;
  border: 2px solid #c9d7d2;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(31, 41, 51, 0.1);
`

const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e5f0ec;

  img {
    width: 180px;
    max-width: 100%;
    height: 180px;
    object-fit: contain;
  }
`

const Details = styled.div`
  padding: 20px;

  h2 {
    margin: 0 0 12px;
    color: #24483f;
    text-transform: capitalize;
  }

  p {
    margin: 6px 0;
  }
`

const Number = styled.span`
  color: #5a6870;
  font-weight: bold;
`

const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`

const Type = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #f0b44d;
  color: #332500;
  text-transform: capitalize;
`

const Message = styled.p`
  padding: 40px 20px;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  font-size: calc(18px + 0.2vw);
`

const Footer = styled.footer`
  margin-top: 34px;
  text-align: center;
  color: #50616a;

  a {
    color: #2f5d50;
  }
`

export default function PokemonGallery({
  pokemon,
  loading,
  error,
}: PokemonGalleryProps) {
  return (
    <Page>
      <Header>
        <h1>Pokemon Explorer</h1>
        <p>Basic information about the first twelve Pokemon</p>
      </Header>

      {loading && <Message>Loading Pokemon...</Message>}
      {error && <Message>{error}</Message>}

      {!loading && !error && (
        <Grid>
          {pokemon.map((item) => (
            <Card key={item.id}>
              <ImageArea>
                <img src={item.image} alt={item.name} />
              </ImageArea>
              <Details>
                <h2>{item.name}</h2>
                <Number>Pokemon #{item.id}</Number>
                <p>Height: {item.height / 10} m</p>
                <p>Weight: {item.weight / 10} kg</p>
                <TypeList>
                  {item.types.map((type) => (
                    <Type key={type}>{type}</Type>
                  ))}
                </TypeList>
              </Details>
            </Card>
          ))}
        </Grid>
      )}

      <Footer>
        Data provided by <a href="https://pokeapi.co/">PokéAPI</a>
      </Footer>
    </Page>
  )
}
