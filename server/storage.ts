export interface IStorage {
  getUser(id: number): Promise<{ id: number; username: string; password: string } | undefined>;
  getUserByUsername(username: string): Promise<{ id: number; username: string; password: string } | undefined>;
  insertUser(user: { username: string; password: string }): Promise<{ id: number; username: string; password: string }>;
}

class MemStorage implements IStorage {
  private users: Map<number, { id: number; username: string; password: string }> = new Map();
  private nextId = 1;

  async getUser(id: number) {
    return this.users.get(id);
  }

  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async insertUser(user: { username: string; password: string }) {
    const newUser = { ...user, id: this.nextId++ };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();
