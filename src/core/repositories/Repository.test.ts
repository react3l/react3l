import {Repository} from './Repository';

describe('Repository', () => {
  it('create repository', () => {
    const repository: Repository = new Repository();
    expect(repository).toBeTruthy();
  });
});
