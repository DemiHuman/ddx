import { UUID, randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

export async function getRandomPhone(): Promise<string> {
    return `+7901${new Date().getTime().toString().substring(6)}`;
};

export async function getRandomEmail(): Promise<string> {
    return `test.rbo.ds+${new Date().getTime().toString().substring(6)}@gmail.com`;
};

export async function getRandomRequestId(): Promise<UUID> {
    return randomUUID();
};

export async function getRandomSessionId(): Promise<UUID> {
    return randomUUID();
};

export async function getRandomNumber(): Promise<string> {
    return `${new Date().getTime().toString()}`;
};

export async function getRandomFirstName(): Promise<string> {
    return faker.person.firstName();
};

export async function getRandomLastName(): Promise<string> {
    return faker.person.lastName();
};
