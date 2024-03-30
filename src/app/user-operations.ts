'use server'

import prisma from './lib/prisma'
import { redirect } from 'next/navigation'
import { type Profile } from './database-interfaces'

export async function redirectToLogin (): Promise<void> {
  redirect('/login')
}

export async function redirectToAccountPage (): Promise<void> {
  // redirect
}

export async function insertUser (email: string): Promise<Profile> {
  const userDB = await prisma.user.create({
    data: {
      email
    }
  })
  const user: Profile = {
    id: userDB.id,
    email: userDB.email,
    name: null,
    sets: null
  }
  return user
}

export async function updateName (profile: Profile): Promise<any> {
  const user = await prisma.user.update({
    where: { email: profile.email },
    data: {
      name: profile.name
    }
  })
  return user
}

export async function getUser (email: string): Promise<any> {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        email
      }
    }
  )
  return user
}

export async function addSetToUser (email: string, set: any): Promise<any> {
  const user = await prisma.user.update({
    where: { email },
    data: {
      sets: {
        connect: {
          id: set.id
        }
      }
    },
    include: {
      sets: true
    }
  })
  return user
}

export async function removeSetFromUser (email: string, set: any): Promise<any> {
  const user = await prisma.user.update({
    where: { email },
    data: {
      sets: {
        disconnect: {
          id: set.id
        }
      }
    },
    include: {
      sets: true
    }
  })
  return user
}
