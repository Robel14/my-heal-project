import { Carousel } from "@mantine/carousel"
import { useMediaQuery } from "@mantine/hooks"
import { Card, Image, Text, AspectRatio, useMantineTheme } from "@mantine/core"

const data = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_47_2025-03-12_15-06-25.jpg-6YV8jT1iP9vFwKAzE6hT9hJ94S1C9K.jpeg",
    title: "Empowering Communities",
    description: "Supporting communities through various initiatives",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_46_2025-03-12_15-06-25.jpg-SurqupKYYd7BzqVqN01I1dj4eoHaW8.jpeg",
    title: "Community Programs",
    description: "Engaging youth in educational and development activities",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_48_2025-03-12_15-06-25.jpg-lI2mqp6Dc23a72cTibJjkMYG4Hm6EJ.jpeg",
    title: "Youth Education",
    description: "Supporting youth through education and uniform provision programs",
  },
]

function CardCarousel() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image src={item.url || "/placeholder.svg"} alt={item.title} />
          </AspectRatio>
        </Card.Section>

        <Text weight={500} size="lg" mt="md">
          {item.title}
        </Text>

        <Text size="sm" color="dimmed" mt="sm">
          {item.description}
        </Text>
      </Card>
    </Carousel.Slide>
  ))

  return (
    <Carousel slideSize={mobile ? "100%" : "50%"} slideGap="md" loop align="start" slidesToScroll={mobile ? 1 : 2}>
      {slides}
    </Carousel>
  )
}

export default CardCarousel
