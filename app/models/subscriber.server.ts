import { prisma } from '~/db.server';

export async function createSubscriber(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await prisma.subscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    return { subscriber: existing, created: false };
  }

  const subscriber = await prisma.subscriber.create({
    data: {
      email: normalizedEmail,
    },
  });

  return { subscriber, created: true };
}