'use client'
import React from 'react'
import './styles.css'
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconCode,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown
} from '@tabler/icons-react'
import classes from './HeaderMegaMenu.module.css'
import Link from 'next/link'

const headerData = [
  {
    icon: IconCode,
    title: 'Easy collaboration',
    description: 'Studying the same topic? Easily make flashcards with your friend.'
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'Style your flashcards with rich text and code blocks for free.'
  },
  {
    icon: IconChartPie3,
    title: 'Smart flashcards',
    description: 'It prioritizes what you don\'t know, and helps you study more effectively.'
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'We use Google Authentication to authenticate users. Gone are the days of storing passwords in databases.'
  }
]

interface SubNavbarProps {
  session: boolean
}

const SubNavbar: React.FC<SubNavbarProps> = ({ session }): React.JSX.Element => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const theme = useMantineTheme()

  const links = headerData.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={'/'}>Easy Cards</Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Create flashcards now
                      </Text>
                      <Text size="xs" c="dimmed">
                        Unlock the Easy Cards magic.
                      </Text>
                    </div>
                    <Button component={Link} href={'/create'} variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            {session && <a href="/create" className={classes.link}>
              Create
            </a>}
            {session && <a href="/sets" className={classes.link}>
              Sets
            </a>}
          </Group>

          {session && <Group visibleFrom="sm">
          <Button component={Link} href={'/account'} variant="default">Account</Button>
          </Group>}

          {!session && <Group visibleFrom="sm">
              <Button component={Link} href={'/api/login'} variant="default">Log in with Google</Button>
          </Group>}

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/search" className={classes.link}>
            Search
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          {session && <a href="/create" className={classes.link}>
            Create
          </a>}
          {session && <a href="/sets" className={classes.link}>
            My sets
          </a>}

          <Divider my="sm" />

          {session && <Group justify="center" grow pb="xl" px="md">
            <Button component={Link} href={'/account'} variant="default">Account</Button>
          </Group>}

          {!session && <Group justify="center" grow pb="xl" px="md">
            <Button component={Link} href={'/api/login'} variant="default">Log in/Sign up</Button>
          </Group>}
        </ScrollArea>
      </Drawer>
    </Box>
  )
}

export default SubNavbar
